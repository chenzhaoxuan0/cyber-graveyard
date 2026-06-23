/**
 * 视频导出（US-07）
 * 使用 canvas.captureStream + MediaRecorder 录制长图匀速滚动
 * - Chrome/Edge/Firefox: WebM (VP9/VP8)
 * - Safari: MP4 (H.264) 回退
 */
interface VideoExportOptions {
  /** 滚动总时长（毫秒），默认 8000 */
  duration?: number
  /** 输出帧率，默认 30 */
  fps?: number
  /** 输出宽度，默认 1080 */
  width?: number
}

export async function exportVideo(
  element: HTMLElement,
  filename: string,
  opts: VideoExportOptions = {}
): Promise<void> {
  const { duration = 8000, fps = 30, width = 1080 } = opts

  // 1. 先用 html-to-canvas 思路：将 element 绘制到离屏 canvas
  //    这里用 dom-to-image 的简化版：用 SVG foreignObject
  const totalHeight = element.scrollHeight
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = Math.round((width / element.scrollWidth) * totalHeight)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法获取 canvas 2d context')

  // 2. 将 DOM 转为 SVG foreignObject → Image → canvas
  const svgDataUrl = await domToSvg(element, totalHeight)
  const img = await loadImage(svgDataUrl)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  // 3. 录制：逐帧滚动绘制
  const stream = canvas.captureStream(fps)
  const mimeType = pickMimeType()
  if (!mimeType) throw new Error('当前浏览器不支持 MediaRecorder')

  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 4_000_000,
  })

  const chunks: Blob[] = []
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data)
  }

  recorder.start()

  // 逐帧滚动
  const frameMs = 1000 / fps
  const totalFrames = Math.round(duration / frameMs)
  const viewportHeight = canvas.height
  // 视窗高度固定为 canvas 高度，但若内容比视窗高则滚动
  // 这里 canvas 已是完整长图，我们模拟"视窗在长图上滚动"
  // 改用：创建一个视窗 canvas，逐帧 drawImage 源 canvas 的不同区域
  const viewCanvas = document.createElement('canvas')
  viewCanvas.width = width
  viewCanvas.height = Math.min(viewportHeight, 1920) // 视窗高度上限 1920
  const viewCtx = viewCanvas.getContext('2d')!
  const viewStream = viewCanvas.captureStream(fps)
  const viewRecorder = new MediaRecorder(viewStream, {
    mimeType,
    videoBitsPerSecond: 4_000_000,
  })
  const viewChunks: Blob[] = []
  viewRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) viewChunks.push(e.data)
  }
  const viewDone = new Promise<Blob>((resolve) => {
    viewRecorder.onstop = () => resolve(new Blob(viewChunks, { type: mimeType }))
  })

  // 停掉第一个 recorder（我们改用 viewCanvas）
  recorder.stop()

  viewRecorder.start()

  const maxScroll = Math.max(0, canvas.height - viewCanvas.height)
  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1)
    const sy = Math.round(progress * maxScroll)
    viewCtx.fillStyle = '#0a0a0f'
    viewCtx.fillRect(0, 0, viewCanvas.width, viewCanvas.height)
    viewCtx.drawImage(
      canvas,
      0,
      sy,
      canvas.width,
      viewCanvas.height,
      0,
      0,
      viewCanvas.width,
      viewCanvas.height
    )
    await sleep(frameMs)
  }

  // 最后一帧停留 500ms
  await sleep(500)
  viewRecorder.stop()

  const blob = await viewDone
  downloadBlob(blob, filename)
}

function pickMimeType(): string | null {
  const candidates = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4;codecs=h264',
    'video/mp4',
  ]
  for (const m of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) {
      return m
    }
  }
  return null
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 将 DOM 元素转为 SVG data URL（含 foreignObject）
 */
async function domToSvg(element: HTMLElement, height: number): Promise<string> {
  const width = element.scrollWidth

  // 序列化 DOM
  const clone = element.cloneNode(true) as HTMLElement
  // 内联 computed style（简化版：只处理关键属性）
  inlineStyles(element, clone)

  const xml = new XMLSerializer().serializeToString(clone)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;">
        ${xml}
      </div>
    </foreignObject>
  </svg>`

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

function inlineStyles(source: HTMLElement, target: HTMLElement): void {
  const computed = getComputedStyle(source)
  const props: string[] = [
    'color',
    'background',
    'background-color',
    'background-image',
    'font',
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'text-align',
    'line-height',
    'letter-spacing',
    'border',
    'border-color',
    'border-radius',
    'padding',
    'margin',
    'width',
    'height',
    'display',
    'flex',
    'flex-direction',
    'justify-content',
    'align-items',
    'opacity',
    'box-shadow',
    'text-shadow',
  ]
  for (const p of props) {
    target.style.setProperty(p, computed.getPropertyValue(p))
  }
  // 递归子元素
  const sChildren = source.children
  const tChildren = target.children
  for (let i = 0; i < sChildren.length && i < tChildren.length; i++) {
    if (sChildren[i] instanceof HTMLElement && tChildren[i] instanceof HTMLElement) {
      inlineStyles(sChildren[i] as HTMLElement, tChildren[i] as HTMLElement)
    }
  }
}

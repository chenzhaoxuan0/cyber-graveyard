/**
 * 视频导出（US-07）
 * 使用 canvas.captureStream + MediaRecorder 录制长图匀速滚动
 * - Chrome/Edge/Firefox: WebM (VP9/VP8)
 * - Safari: MP4 (H.264) 回退
 */
import { snapdom } from '@zumer/snapdom'

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

  // 1. 用 snapdom 把 DOM 渲成离屏 canvas（CSS 属性全保真，替代旧 domToSvg）
  const canvas = await snapdom.toCanvas(element, {
    width,
    scale: 1, // 视频不需要 2x，节省内存
    backgroundColor: getComputedStyle(element).backgroundColor || '#0a0a0f',
  })

  // 2. 录制：逐帧滚动绘制（视窗在长图上匀速滚动）
  const mimeType = pickMimeType()
  if (!mimeType) throw new Error('当前浏览器不支持 MediaRecorder')

  const viewCanvas = document.createElement('canvas')
  viewCanvas.width = width
  viewCanvas.height = Math.min(canvas.height, 1920) // 视窗高度上限 1920
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

  viewRecorder.start()

  const frameMs = 1000 / fps
  const totalFrames = Math.round(duration / frameMs)
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

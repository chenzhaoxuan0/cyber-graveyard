import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Undo2, Redo2, Eye } from 'lucide-react'
import * as fabric from 'fabric'
import { useAppStore } from '@/store'
import { DIY_ELEMENTS } from '@/data/tombstones'
import { DiyElementPanel } from '@/components/editor/DiyElementPanel'

export default function EditorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const form = useAppStore((s) => s.form)
  const pushHistory = useAppStore((s) => s.pushHistory)
  const undoAction = useAppStore((s) => s.undo)
  const redoAction = useAppStore((s) => s.redo)
  const historyIndex = useAppStore((s) => s.historyIndex)
  const historyLen = useAppStore((s) => s.history.length)
  const canUndo = historyIndex > 0
  const canRedo = historyIndex >= 0 && historyIndex < historyLen - 1

  const [scale, setScale] = useState(1)

  // 初始化 fabric 画布
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1080,
      height: 1440,
      backgroundColor: '#14141c',
      preserveObjectStacking: true,
    })
    fabricRef.current = canvas

    // 添加初始碑文
    if (form.epitaph) {
      const text = new fabric.IText(form.epitaph, {
        left: 540,
        top: 720,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Noto Serif SC, serif',
        fontSize: 48,
        fill: '#f5c542',
        textAlign: 'center',
      })
      canvas.add(text)
    }

    // 移动端缩放
    const updateScale = () => {
      const viewportWidth = window.innerWidth
      if (viewportWidth < 1080) {
        setScale((viewportWidth - 32) / 1080)
      } else {
        setScale(1)
      }
    }
    updateScale()
    window.addEventListener('resize', updateScale)

    // 操作历史
    canvas.on('object:added', () => pushHistory(canvas.toJSON()))
    canvas.on('object:modified', () => pushHistory(canvas.toJSON()))
    canvas.on('object:removed', () => pushHistory(canvas.toJSON()))

    return () => {
      canvas.dispose()
      window.removeEventListener('resize', updateScale)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddElement = (elementType: string, content: string) => {
    const canvas = fabricRef.current
    if (!canvas) return

    // 图片类型：触发文件上传
    if (elementType === 'image') {
      handleUploadImage()
      return
    }

    let obj: fabric.Object
    if (elementType === 'text') {
      obj = new fabric.IText(content, {
        left: 540,
        top: 400,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Noto Serif SC, serif',
        fontSize: 36,
        fill: '#e6e6f0',
      })
    } else if (elementType === 'rect') {
      obj = new fabric.Rect({
        left: 400,
        top: 400,
        width: 200,
        height: 80,
        fill: '#8c6d3f',
        stroke: '#f5c542',
        strokeWidth: 2,
      })
    } else if (elementType === 'circle') {
      obj = new fabric.Circle({
        left: 470,
        top: 400,
        radius: 60,
        fill: '#8b1a1a',
        stroke: '#f5c542',
        strokeWidth: 2,
      })
    } else if (elementType === 'qrcode') {
      // 二维码占位（工具版不生成真实二维码，仅占位框）
      obj = new fabric.Rect({
        left: 470,
        top: 400,
        width: 120,
        height: 120,
        fill: '#e6e6f0',
        stroke: '#0a0a0f',
        strokeWidth: 4,
      })
    } else if (elementType === 'pattern' || elementType === 'heritage') {
      // 纹样 / 非遗纹样：装饰占位框 + 标签
      const group = [
        new fabric.Rect({
          left: 420,
          top: 380,
          width: 240,
          height: 120,
          fill: 'rgba(140,109,63,0.15)',
          stroke: '#8c6d3f',
          strokeWidth: 2,
          rx: 8,
          ry: 8,
        }),
        new fabric.IText(content, {
          left: 540,
          top: 440,
          originX: 'center',
          originY: 'center',
          fontFamily: 'Noto Sans SC, sans-serif',
          fontSize: 24,
          fill: '#c0c0c8',
          textAlign: 'center',
        }),
      ]
      group.forEach((o) => canvas.add(o))
      canvas.setActiveObject(group[group.length - 1])
      return
    } else if (elementType === 'link') {
      // 链接：带下划线的文本
      obj = new fabric.IText(content || 'https://', {
        left: 540,
        top: 400,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Noto Sans SC, sans-serif',
        fontSize: 28,
        fill: '#4a7c59',
        underline: true,
      })
    } else {
      obj = new fabric.IText(content || '文字', {
        left: 540,
        top: 400,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Noto Sans SC, sans-serif',
        fontSize: 28,
        fill: '#a8a8b8',
      })
    }
    canvas.add(obj)
    canvas.setActiveObject(obj)
  }

  const handleUploadImage = () => {
    const canvas = fabricRef.current
    if (!canvas) return
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const dataUrl = ev.target?.result as string
        if (!dataUrl) return
        // fabric.js 6: fromURL 返回 Promise
        const img = await fabric.Image.fromURL(dataUrl)
        // 等比缩放到最大宽度 300
        const maxW = 300
        if (img.width && img.width > maxW) {
          img.scaleToWidth(maxW)
        }
        img.set({ left: 540, top: 400, originX: 'center', originY: 'center' })
        canvas.add(img)
        canvas.setActiveObject(img)
        canvas.renderAll()
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const handleUndo = () => {
    const canvas = fabricRef.current
    if (!canvas) return
    const snapshot = undoAction()
    if (snapshot) {
      canvas.loadFromJSON(snapshot).then(() => {
        canvas.renderAll()
      })
    }
  }

  const handleRedo = () => {
    const canvas = fabricRef.current
    if (!canvas) return
    const snapshot = redoAction()
    if (snapshot) {
      canvas.loadFromJSON(snapshot).then(() => {
        canvas.renderAll()
      })
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/create"
          className="inline-flex items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回填碑文
        </Link>
        <h1 className="font-serif text-xl text-candle">DIY 我 的 墓 碑</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUndo}
            disabled={!canUndo}
            className="rounded border border-mist-dim/40 p-1.5 text-mist-soft transition-colors enabled:hover:border-candle enabled:hover:text-candle disabled:opacity-30"
            aria-label="撤销"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={!canRedo}
            className="rounded border border-mist-dim/40 p-1.5 text-mist-soft transition-colors enabled:hover:border-candle enabled:hover:text-candle disabled:opacity-30"
            aria-label="重做"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <Link
            to="/preview"
            className="inline-flex items-center gap-1 rounded border border-candle/60 bg-candle/10 px-2 py-1.5 text-xs text-candle transition-colors hover:bg-candle/20"
          >
            <Eye className="h-3.5 w-3.5" />
            预览
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        {/* 左侧组件库 */}
        <DiyElementPanel onAdd={handleAddElement} elements={DIY_ELEMENTS} />

        {/* 右侧画布 */}
        <div className="overflow-auto rounded border border-ink-card bg-ink-card/40 p-4">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: 1080,
              height: 1440 * scale + 20,
            }}
          >
            <canvas ref={canvasRef} width={1080} height={1440} />
          </div>
          <p className="mt-2 text-center text-xs text-mist-dim">
            画布尺寸 1080 × 1440 · {scale < 1 ? `已缩放至 ${Math.round(scale * 100)}%` : '原始尺寸'}
          </p>
        </div>
      </div>
    </div>
  )
}

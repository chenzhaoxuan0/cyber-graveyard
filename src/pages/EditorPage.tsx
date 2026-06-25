import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Undo2, Redo2, Eye, Trash2, Monitor, ZoomIn, ZoomOut } from 'lucide-react'
import * as fabric from 'fabric'
import { useAppStore } from '@/store'
import { getAllDiyElements } from '@/data/tombstones'
import { getCanvasPalette } from '@/data/story-mapping'
import { DiyElementPanel } from '@/components/editor/DiyElementPanel'
import type { DiyElement } from '@/types'

type Palette = { bg: string; fg: string; accent: string; border: string }

/** 故事流首次进入时，按装饰元素元数据在画布上生成一个 fabric 对象（位于 left/top） */
function makeSeedObject(el: DiyElement, left: number, top: number, palette: Palette): fabric.Object {
  const content = el.content ?? el.label
  if (el.type === 'text') {
    return new fabric.IText(content, {
      left, top, fontFamily: 'Noto Serif SC, serif', fontSize: 32, fill: palette.fg,
    })
  }
  if (el.type === 'link') {
    return new fabric.IText(content || 'https://', {
      left, top, fontFamily: 'Noto Sans SC, sans-serif', fontSize: 24, fill: palette.accent, underline: true,
    })
  }
  if (el.type === 'qrcode') {
    return new fabric.Rect({
      left, top, width: 120, height: 120, fill: '#fffcf7', stroke: palette.fg, strokeWidth: 4,
    })
  }
  // 默认装饰类（badge/emoji/glitter/neon/standee/glowstick/achievement/danmaku/pattern/heritage/image）
  return new fabric.IText(content || '·', {
    left, top, fontFamily: 'Noto Sans SC, sans-serif', fontSize: 36, fill: palette.accent,
  })
}

export default function EditorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  // 在恢复画布（loadFromJSON）期间抑制 object:* 事件触发的 syncSnapshot，
  // 避免逐对象回写 history 与预览图。组件级 ref，供 init effect 与 undo/redo 共享。
  const suppressSyncRef = useRef(false)
  const form = useAppStore((s) => s.form)
  const canvasSnapshot = useAppStore((s) => s.canvasSnapshot)
  const pushHistory = useAppStore((s) => s.pushHistory)
  const setCanvasState = useAppStore((s) => s.setCanvasState)
  const undoAction = useAppStore((s) => s.undo)
  const redoAction = useAppStore((s) => s.redo)
  const historyIndex = useAppStore((s) => s.historyIndex)
  const historyLen = useAppStore((s) => s.history.length)
  const canUndo = historyIndex > 0
  const canRedo = historyIndex >= 0 && historyIndex < historyLen - 1

  const [scale, setScale] = useState(1)
  const [isFitView, setIsFitView] = useState(true)
  const [selectedCount, setSelectedCount] = useState(0)

  const updateScale = useCallback(() => {
    const viewportWidth = window.innerWidth
    const containerPadding = 32
    const availableWidth = viewportWidth - containerPadding

    if (isFitView && availableWidth < 1080) {
      setScale(Math.max(0.35, (availableWidth - 32) / 1080))
    } else if (isFitView && viewportWidth < 1280) {
      // lg breakpoint: left sidebar 280px + gap 16px + padding
      const lgAvailableWidth = viewportWidth - 280 - 16 - containerPadding
      setScale(Math.max(0.45, (lgAvailableWidth - 32) / 1080))
    } else {
      setScale(1)
    }
  }, [isFitView])

  // 初始化 fabric 画布
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1080,
      height: 1440,
      backgroundColor: '#f7f5f0',
      preserveObjectStacking: true,
    })
    fabricRef.current = canvas

    // 同步画布状态到全局 store：历史（撤销/重做）+ 预览图（供预览页展示）
    // 在恢复画布期间通过 suppressSyncRef 跳过，避免逐对象触发同步
    const syncSnapshot = () => {
      if (suppressSyncRef.current) return
      const json = JSON.stringify(canvas.toJSON())
      pushHistory(json)
      setCanvasState(json, canvas.toDataURL())
    }

    // 恢复已有画布；首次进入时按故事流选择播种画布（palette 上色 + 装饰品网格摆放）
    if (canvasSnapshot) {
      suppressSyncRef.current = true
      canvas.loadFromJSON(canvasSnapshot).then(() => {
        canvas.renderAll()
        suppressSyncRef.current = false
        setCanvasState(canvasSnapshot, canvas.toDataURL())
      })
    } else {
      const palette = getCanvasPalette(form.formId, form.templateId)
      canvas.backgroundColor = palette.bg

      // 墓志铭居中
      if (form.epitaph) {
        canvas.add(
          new fabric.IText(form.epitaph, {
            left: 540,
            top: 720,
            originX: 'center',
            originY: 'center',
            fontFamily: 'Noto Serif SC, serif',
            fontSize: 48,
            fill: palette.fg,
            textAlign: 'center',
          }),
        )
      }

      // 已选装饰品按 3×3 网格摆放在画布上半区
      const allElements: DiyElement[] = getAllDiyElements()
      const selected = form.decorationIds
        .map((id) => allElements.find((e) => e.id === id))
        .filter((e): e is DiyElement => Boolean(e))
        .slice(0, 9)

      selected.forEach((el, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const left = 140 + col * 360
        const top = 120 + row * 160
        canvas.add(makeSeedObject(el, left, top, palette))
      })

      canvas.renderAll()
      syncSnapshot()
    }

    updateScale()
    window.addEventListener('resize', updateScale)

    // 监听选区变化
    canvas.on('selection:created', () => setSelectedCount(canvas.getActiveObjects().length))
    canvas.on('selection:updated', () => setSelectedCount(canvas.getActiveObjects().length))
    canvas.on('selection:cleared', () => setSelectedCount(0))

    // 操作历史 + 预览同步
    canvas.on('object:added', syncSnapshot)
    canvas.on('object:modified', syncSnapshot)
    canvas.on('object:removed', syncSnapshot)

    return () => {
      canvas.dispose()
      window.removeEventListener('resize', updateScale)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 视图模式变化时重新计算缩放
  useEffect(() => {
    // eslint-disable-next-line
    updateScale()
  }, [isFitView, updateScale])

  const handleAddElement = (elementType: string, content: string) => {
    const canvas = fabricRef.current
    if (!canvas) return

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
        fill: '#5c574d',
      })
    } else if (elementType === 'rect') {
      obj = new fabric.Rect({
        left: 400,
        top: 400,
        width: 200,
        height: 80,
        fill: '#c9985d',
        stroke: '#a67c48',
        strokeWidth: 2,
      })
    } else if (elementType === 'circle') {
      obj = new fabric.Circle({
        left: 470,
        top: 400,
        radius: 60,
        fill: '#a65d6d',
        stroke: '#c9985d',
        strokeWidth: 2,
      })
    } else if (elementType === 'qrcode') {
      obj = new fabric.Rect({
        left: 470,
        top: 400,
        width: 120,
        height: 120,
        fill: '#fffcf7',
        stroke: '#3d3a35',
        strokeWidth: 4,
      })
    } else if (elementType === 'pattern' || elementType === 'heritage') {
      const group = [
        new fabric.Rect({
          left: 420,
          top: 380,
          width: 240,
          height: 120,
          fill: 'rgba(107,142,107,0.15)',
          stroke: '#6b8e6b',
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
          fill: '#4a6b4a',
          textAlign: 'center',
        }),
      ]
      group.forEach((o) => canvas.add(o))
      canvas.setActiveObject(group[group.length - 1])
      return
    } else if (elementType === 'link') {
      obj = new fabric.IText(content || 'https://', {
        left: 540,
        top: 400,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Noto Sans SC, sans-serif',
        fontSize: 28,
        fill: '#6b9a8f',
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
        fill: '#8a8478',
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
        const img = await fabric.Image.fromURL(dataUrl)
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
      suppressSyncRef.current = true
      canvas.loadFromJSON(snapshot).then(() => {
        canvas.renderAll()
        suppressSyncRef.current = false
        setCanvasState(snapshot, canvas.toDataURL())
      })
    }
  }

  const handleRedo = () => {
    const canvas = fabricRef.current
    if (!canvas) return
    const snapshot = redoAction()
    if (snapshot) {
      suppressSyncRef.current = true
      canvas.loadFromJSON(snapshot).then(() => {
        canvas.renderAll()
        suppressSyncRef.current = false
        setCanvasState(snapshot, canvas.toDataURL())
      })
    }
  }

  const handleDelete = () => {
    const canvas = fabricRef.current
    if (!canvas) return
    const activeObjects = canvas.getActiveObjects()
    if (activeObjects.length === 0) return
    activeObjects.forEach((obj) => canvas.remove(obj))
    canvas.discardActiveObject()
    canvas.renderAll()
    setSelectedCount(0)
  }

  // 键盘快捷键：Delete / Backspace 删除，Ctrl/Cmd+Z 撤销，Ctrl/Cmd+Shift+Z 重做
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = fabricRef.current
      if (!canvas) return

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedCount > 0) {
        e.preventDefault()
        handleDelete()
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          handleRedo()
        } else {
          handleUndo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // handleUndo/handleRedo 仅依赖稳定的 ref 与 store action
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCount])

  const handleZoomIn = () => setScale((s) => Math.min(1.5, s + 0.1))
  const handleZoomOut = () => setScale((s) => Math.max(0.35, s - 0.1))

  const viewModeLabel = isFitView ? '适应画布' : '原始尺寸'
  const scalePercent = Math.round(scale * 100)

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6">
      {/* 顶部工具栏 */}
      <header className="mb-4 flex flex-col gap-3 rounded-xl border border-ink-card bg-ink-soft/80 p-3 backdrop-blur sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <Link
          to="/create"
          className="inline-flex h-9 w-fit items-center gap-1.5 rounded-md px-2 text-xs text-mist-dim transition-base hover:bg-ink-card hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          返回填碑文
        </Link>

        <h1 className="font-serif text-lg tracking-[0.2em] text-candle sm:text-xl">DIY 我 的 墓 碑</h1>

        <div className="flex flex-wrap items-center gap-2">
          {/* 历史操作组 */}
          <div className="flex items-center gap-1 rounded-lg border border-ink-border bg-ink-card/60 p-1">
            <IconButton onClick={handleUndo} disabled={!canUndo} aria-label="撤销 (Ctrl+Z)" title="撤销">
              <Undo2 className="h-4 w-4" />
            </IconButton>
            <div className="h-4 w-px bg-ink-border" aria-hidden="true" />
            <IconButton onClick={handleRedo} disabled={!canRedo} aria-label="重做 (Ctrl+Shift+Z)" title="重做">
              <Redo2 className="h-4 w-4" />
            </IconButton>
          </div>

          {/* 视图操作组 */}
          <div className="flex items-center gap-1 rounded-lg border border-ink-border bg-ink-card/60 p-1">
            <IconButton onClick={handleZoomOut} aria-label="缩小" title="缩小">
              <ZoomOut className="h-4 w-4" />
            </IconButton>
            <span className="min-w-[3ch] px-1 text-center text-[11px] tabular-nums text-mist-dim">{scalePercent}%</span>
            <IconButton onClick={handleZoomIn} aria-label="放大" title="放大">
              <ZoomIn className="h-4 w-4" />
            </IconButton>
            <IconButton
              onClick={() => setIsFitView((v) => !v)}
              aria-label={viewModeLabel}
              title={viewModeLabel}
              active={isFitView}
            >
              <Monitor className="h-4 w-4" />
            </IconButton>
          </div>

          {/* 删除与预览 */}
          <div className="flex items-center gap-2">
            <IconButton
              onClick={handleDelete}
              disabled={selectedCount === 0}
              aria-label="删除选中元素 (Delete)"
              title="删除选中元素"
              destructive
            >
              <Trash2 className="h-4 w-4" />
            </IconButton>
            <Link
              to="/preview"
              className="btn-primary inline-flex h-9 items-center gap-1.5 px-3 text-xs cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              预览
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
        {/* 左侧组件库 */}
        <DiyElementPanel onAdd={handleAddElement} elements={getAllDiyElements()} />

        {/* 右侧画布 */}
        <section
          className="relative overflow-auto rounded-xl border border-ink-border bg-ink-card/40 p-3 shadow-tomb sm:p-4"
          aria-label="编辑画布"
        >
          <div
            className="relative mx-auto rounded border border-ink-border shadow-tomb-lg"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: 1080,
              height: 1440,
            }}
          >
            <canvas ref={canvasRef} width={1080} height={1440} />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-mist-dim">
            <span>画布尺寸 1080 × 1440</span>
            <span className="text-mist-muted" aria-hidden="true">·</span>
            <span className="tabular-nums">{scalePercent}%</span>
            {selectedCount > 0 && (
              <>
                <span className="text-mist-muted" aria-hidden="true">·</span>
                <span className="text-candle">已选 {selectedCount} 个元素</span>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

// 统一图标按钮：44×44 触控目标，统一 hover/focus/disabled 状态
interface IconButtonProps {
  onClick: () => void
  children: React.ReactNode
  'aria-label': string
  title?: string
  disabled?: boolean
  active?: boolean
  destructive?: boolean
}

function IconButton({ onClick, children, disabled, active, destructive, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex h-9 w-9 items-center justify-center rounded-md border transition-base',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink-card',
        'cursor-pointer disabled:cursor-not-allowed',
        destructive
          ? 'border-blood/40 text-mist-soft hover:border-blood hover:bg-blood/15 hover:text-blood disabled:opacity-30'
          : active
            ? 'border-candle/60 bg-candle/10 text-candle hover:bg-candle/15'
            : 'border-transparent bg-transparent text-mist-soft hover:border-mist-muted hover:bg-ink-hover hover:text-mist disabled:opacity-30',
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}

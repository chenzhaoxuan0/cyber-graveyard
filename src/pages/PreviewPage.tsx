import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Film, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useAppStore } from '@/store'
import { TEMPLATES } from '@/data/tombstones'
import { TombstoneVisual } from '@/components/tombstone/TombstoneVisual'
import { exportLongImage } from '@/lib/export'
import { exportVideo } from '@/lib/videoExport'

export default function PreviewPage() {
  const form = useAppStore((s) => s.form)
  const canvasPreview = useAppStore((s) => s.canvasPreview)
  const previewRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState<'image' | 'video' | null>(null)
  const [previewScale, setPreviewScale] = useState(1)

  const template = TEMPLATES.find((t) => t.id === form.templateId) || TEMPLATES[0]

  // 预览自适应：根据容器宽度缩放，无需缩放浏览器即可看全
  useEffect(() => {
    const updateScale = () => {
      const containerWidth = previewRef.current?.parentElement?.clientWidth || Math.max(320, window.innerWidth - 32)
      setPreviewScale(Math.min(1, containerWidth / 1080))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const handleExportImage = async () => {
    if (!previewRef.current || exporting) return
    setExporting('image')
    try {
      await exportLongImage(previewRef.current, `赛博墓园-${form.epitaph.slice(0, 10)}.png`)
    } catch (e) {
      console.error(e)
      alert('导出失败，请重试')
    } finally {
      setExporting(null)
    }
  }

  const handleExportVideo = async () => {
    if (!previewRef.current || exporting) return
    setExporting('video')
    try {
      await exportVideo(previewRef.current, `赛博墓园-${form.epitaph.slice(0, 10)}.webm`)
    } catch (e) {
      console.error(e)
      alert('视频导出失败，请重试')
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/create"
          className="inline-flex cursor-pointer items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回编辑
        </Link>
        <h1 className="font-serif text-2xl tracking-[0.2em] text-candle">预 览 墓 碑</h1>
        <span className="w-16" />
      </div>

      {/* 墓碑预览（导出目标）：永远渲染 DOM 墓碑；有装饰快照时叠加透明 PNG */}
      <div className="mb-6 flex justify-center">
        <div
          className="relative"
          style={{
            width: 1080 * previewScale,
            height: 1440 * previewScale,
          }}
        >
          <div
            ref={previewRef}
            className="absolute left-0 top-0 overflow-hidden rounded-md border border-ink-border bg-ink-card/40 shadow-tomb-lg"
            style={{
              width: 1080,
              height: 1440,
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
              isolation: 'isolate',
            }}
          >
            <div className="absolute inset-0 z-10">
              <TombstoneVisual
                template={template.category}
                title={form.lifespan || '佚 名'}
                subtitle={template.name}
                epitaph={form.epitaph}
                passerbyMessage={form.passerbyMessage}
                digitalAssets={form.digitalAssets}
                craft={template.category === 'heritage' ? template.id : undefined}
                height={1440}
              />
            </div>
            {canvasPreview && (
              <img
                src={canvasPreview}
                alt="装饰叠层"
                className="absolute inset-0 z-20 block"
                style={{ width: 1080, height: 1440, pointerEvents: 'none' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* 导出按钮 - 使用统一的 btn 工具类 */}
      <div className="sticky bottom-16 z-30 flex flex-col gap-2 rounded-md border border-ink-border bg-ink-soft/95 p-3 backdrop-blur sm:flex-row sm:justify-center">
        <Link
          to="/editor"
          className="btn-secondary cursor-pointer"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          继续装饰
        </Link>
        <button
          type="button"
          onClick={handleExportImage}
          disabled={exporting !== null}
          className="btn-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ImageIcon className="h-4 w-4" aria-hidden="true" />
          {exporting === 'image' ? '导出中…' : '导出长图（PNG）'}
        </button>
        <button
          type="button"
          onClick={handleExportVideo}
          disabled={exporting !== null}
          className="btn-base cursor-pointer border border-blood/60 bg-blood/10 text-blood disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Film className="h-4 w-4" aria-hidden="true" />
          {exporting === 'video' ? '录制中…' : '导出视频（WebM）'}
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-mist-dim">
        长图规格：1080px 宽，长度自适应 · 视频：长图匀速滚动，无 BGM
      </p>
    </div>
  )
}

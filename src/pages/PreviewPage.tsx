import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Film, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useAppStore } from '@/store'
import { TEMPLATES } from '@/data/tombstones'
import { TombstoneVisual } from '@/components/tombstone/TombstoneVisual'
import { exportLongImage } from '@/lib/export'
import { exportVideo } from '@/lib/videoExport'

export default function PreviewPage() {
  const form = useAppStore((s) => s.form)
  const previewRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState<'image' | 'video' | null>(null)

  const template = TEMPLATES.find((t) => t.id === form.templateId) || TEMPLATES[0]

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
          className="inline-flex items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回编辑
        </Link>
        <h1 className="font-serif text-2xl text-candle">预 览 墓 碑</h1>
        <span className="w-16" />
      </div>

      {/* 墓碑预览（导出目标） */}
      <div className="mb-6 flex justify-center">
        <div
          ref={previewRef}
          className="w-full max-w-[540px] overflow-hidden rounded border border-ink-card bg-ink-card/40"
          style={{ width: 1080, maxWidth: '100%' }}
        >
          <TombstoneVisual
            template={template.category}
            title={form.lifespan || '佚 名'}
            subtitle={template.name}
            epitaph={form.epitaph}
            passerbyMessage={form.passerbyMessage}
            digitalAssets={form.digitalAssets}
            craft={template.category === 'heritage' ? template.id : undefined}
          />
        </div>
      </div>

      {/* 导出按钮 */}
      <div className="sticky bottom-16 z-30 flex flex-col gap-2 rounded border border-ink-card bg-ink-soft/95 p-3 backdrop-blur sm:flex-row sm:justify-center">
        <Link
          to="/editor"
          className="inline-flex items-center justify-center gap-2 rounded border border-jade/60 bg-jade-soft/20 px-4 py-2 text-sm text-jade transition-colors hover:bg-jade-soft/40"
        >
          <Sparkles className="h-4 w-4" />
          继续装饰
        </Link>
        <button
          type="button"
          onClick={handleExportImage}
          disabled={exporting !== null}
          className="inline-flex items-center justify-center gap-2 rounded border border-candle/60 bg-candle/10 px-4 py-2 text-sm text-candle transition-colors enabled:hover:bg-candle/20 disabled:opacity-40"
        >
          <ImageIcon className="h-4 w-4" />
          {exporting === 'image' ? '导出中…' : '导出长图（PNG）'}
        </button>
        <button
          type="button"
          onClick={handleExportVideo}
          disabled={exporting !== null}
          className="inline-flex items-center justify-center gap-2 rounded border border-blood/60 bg-blood/10 px-4 py-2 text-sm text-blood transition-colors enabled:hover:bg-blood/20 disabled:opacity-40"
        >
          <Film className="h-4 w-4" />
          {exporting === 'video' ? '录制中…' : '导出视频（WebM）'}
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-mist-dim">
        长图规格：1080px 宽，长度自适应 · 视频：长图匀速滚动，无 BGM
      </p>
    </div>
  )
}

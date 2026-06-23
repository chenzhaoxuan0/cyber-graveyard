import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Eye, Sparkles } from 'lucide-react'
import { TEMPLATES } from '@/data/tombstones'
import { useAppStore } from '@/store'
import { TemplatePicker } from '@/components/create/TemplatePicker'
import { InscriptionForm } from '@/components/create/InscriptionForm'
import { NoticeCard } from '@/components/create/NoticeCard'

export default function CreatePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const form = useAppStore((s) => s.form)
  const setForm = useAppStore((s) => s.setForm)
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    searchParams.get('template') || TEMPLATES[0].id,
  )

  useEffect(() => {
    const t = searchParams.get('template')
    if (t) setSelectedTemplate(t)
  }, [searchParams])

  const canPreview = form.epitaph.trim().length > 0 && form.epitaph.length <= 50

  const handlePreview = () => {
    if (!canPreview) return
    setForm({ ...form, templateId: selectedTemplate })
    navigate('/preview')
  }

  const handleDecorate = () => {
    if (!canPreview) return
    setForm({ ...form, templateId: selectedTemplate })
    navigate('/editor')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回首页
        </Link>
        <h1 className="font-serif text-2xl text-candle">做 我 的 墓 碑</h1>
        <span className="w-16" />
      </div>

      {/* 注意事项卡片 */}
      <NoticeCard />

      {/* 第一步：选模板 */}
      <section className="mb-8">
        <h2 className="mb-3 font-serif text-base text-mist">
          <span className="mr-2 text-candle">第一步</span>
          选模板
        </h2>
        <TemplatePicker
          selected={selectedTemplate}
          onSelect={setSelectedTemplate}
        />
      </section>

      {/* 第二步：填碑文 */}
      <section className="mb-8">
        <h2 className="mb-3 font-serif text-base text-mist">
          <span className="mr-2 text-candle">第二步</span>
          填碑文
        </h2>
        <InscriptionForm />
      </section>

      {/* 操作按钮 */}
      <div className="sticky bottom-16 z-30 flex flex-col gap-2 rounded border border-ink-card bg-ink-soft/95 p-3 backdrop-blur sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleDecorate}
          disabled={!canPreview}
          className="inline-flex items-center justify-center gap-2 rounded border border-jade/60 bg-jade-soft/20 px-4 py-2 text-sm text-jade transition-colors enabled:hover:bg-jade-soft/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles className="h-4 w-4" />
          继续装饰 →
        </button>
        <button
          type="button"
          onClick={handlePreview}
          disabled={!canPreview}
          className="inline-flex items-center justify-center gap-2 rounded border border-candle/60 bg-candle/10 px-4 py-2 text-sm text-candle transition-colors enabled:hover:bg-candle/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Eye className="h-4 w-4" />
          直接预览
        </button>
      </div>

      {!canPreview && (
        <p className="mt-2 text-center text-xs text-mist-dim">
          <AlertTriangle className="mr-1 inline h-3 w-3" />
          请填写墓志铭（必填，≤50 字）后再预览
        </p>
      )}
    </div>
  )
}

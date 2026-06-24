import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Eye, Sparkles, CheckCircle2, PenLine, LayoutTemplate } from 'lucide-react'
import { TEMPLATES } from '@/data/tombstones'
import { useAppStore } from '@/store'
import { TemplatePicker } from '@/components/create/TemplatePicker'
import { InscriptionForm } from '@/components/create/InscriptionForm'
import { NoticeCard } from '@/components/create/NoticeCard'
import { cn } from '@/lib/utils'

interface StepProps {
  number: number
  title: string
  description?: string
  icon: React.ReactNode
  isActive?: boolean
  isComplete?: boolean
  children: React.ReactNode
}

function StepSection({ number, title, description, icon, isActive, isComplete, children }: StepProps) {
  return (
    <section
      className={cn(
        'rounded-md border bg-ink-soft/40 p-5 shadow-tomb transition-base sm:p-6',
        isActive ? 'border-candle/30' : 'border-ink-border',
        isComplete && 'border-jade/20'
      )}
    >
      <div className="mb-4 flex items-start gap-3">
        <div
          className={cn(
            'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-bold transition-base',
            isComplete
              ? 'border-jade/40 bg-jade/15 text-jade'
              : isActive
                ? 'border-candle/50 bg-candle/15 text-candle'
                : 'border-ink-border bg-ink-card text-mist-dim'
          )}
          aria-hidden="true"
        >
          {isComplete ? <CheckCircle2 className="h-4 w-4" /> : icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-base text-mist">
            <span className="mr-2 font-sans text-xs font-medium text-mist-dim">步骤 {number}</span>
            {title}
          </h2>
          {description && <p className="mt-0.5 text-xs text-mist-dim">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

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

  const hasEpitaph = form.epitaph.trim().length > 0
  const canPreview = hasEpitaph && form.epitaph.length <= 50
  const stepOneComplete = Boolean(selectedTemplate)
  const stepTwoComplete = hasEpitaph

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
    <div className="mx-auto max-w-4xl px-4 py-8 pb-32">
      {/* 页面头部 */}
      <header className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="btn-ghost h-9 cursor-pointer px-3 text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回首页
          </Link>
          <div className="hidden text-xs text-mist-dim sm:block">
            本地创作 · 数据不上传
          </div>
        </div>
        <h1 className="text-center font-serif text-2xl text-candle sm:text-3xl">做 我 的 墓 碑</h1>
        <p className="mt-2 text-center text-xs text-mist-dim sm:text-sm">
          选一方碑，留一句话。所有内容仅保存在你的浏览器中。
        </p>
      </header>

      {/* 注意事项卡片 */}
      <div className="mb-6">
        <NoticeCard />
      </div>

      {/* 第一步：选模板 */}
      <StepSection
        number={1}
        title="选模板"
        description="从非遗工艺、文学 IP 或极简现代中选择一方碑形。"
        icon={<LayoutTemplate className="h-4 w-4" />}
        isActive={!stepOneComplete}
        isComplete={stepOneComplete}
      >
        <TemplatePicker selected={selectedTemplate} onSelect={setSelectedTemplate} />
      </StepSection>

      {/* 第二步：填碑文 */}
      <StepSection
        number={2}
        title="填碑文"
        description="写下墓志铭，补充生卒年与数字遗产。"
        icon={<PenLine className="h-4 w-4" />}
        isActive={stepOneComplete && !stepTwoComplete}
        isComplete={stepTwoComplete}
      >
        <InscriptionForm />
      </StepSection>

      {/* 底部操作栏 */}
      <div className="fixed inset-x-0 bottom-12 z-30 border-t border-ink-border bg-ink-soft/95 pb-3 pt-3 backdrop-blur sm:bottom-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 状态提示 */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {canPreview ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-jade" aria-hidden="true" />
                <span className="text-mist-soft">已完成，可以选择预览或继续装饰</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-candle" aria-hidden="true" />
                <span className="text-mist-dim">请填写墓志铭（必填，≤50 字）后再预览</span>
              </>
            )}
          </div>

          {/* 按钮组 */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleDecorate}
              disabled={!canPreview}
              className="btn-secondary h-10 cursor-pointer px-5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              继续装饰
            </button>
            <button
              type="button"
              onClick={handlePreview}
              disabled={!canPreview}
              className="btn-primary h-10 cursor-pointer px-5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              直接预览
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

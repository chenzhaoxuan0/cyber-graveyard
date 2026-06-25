/**
 * 做我的墓碑 —— 故事流分步向导
 * 4 步在 /create 内切换：地区 → 样式 → 装饰 → 碑文
 * 之后跳 /editor 继续装饰，或 /preview 直接预览
 */
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '@/store'
import { StoryProgress } from '@/components/story/StoryProgress'
import { RegionStep } from '@/components/story/RegionStep'
import { StyleStep } from '@/components/story/StyleStep'
import { DecorationStep } from '@/components/story/DecorationStep'
import { InscriptionStep } from '@/components/story/InscriptionStep'
import { NoticeCard } from '@/components/create/NoticeCard'

const STEP_HINT: Record<number, string> = {
  1: '选择一片土地，听听那里的人如何看待生死。',
  2: '一方碑形，是一种对死亡的态度。',
  3: '在墓碑上添些有趣的小玩意吧。',
  4: '写下你想留给这个世界的话。',
}

export default function CreatePage() {
  const navigate = useNavigate()
  const form = useAppStore((s) => s.form)
  const storyStep = useAppStore((s) => s.storyStep)
  const setStoryStep = useAppStore((s) => s.setStoryStep)

  const hasRegion = form.regionId.trim().length > 0
  const hasEpitaph = form.epitaph.trim().length > 0
  const canNext = storyStep === 1 ? hasRegion : true
  const canFinish = hasEpitaph

  const handleNext = () => {
    if (!canNext) return
    setStoryStep(Math.min(4, storyStep + 1))
  }
  const handlePrev = () => setStoryStep(Math.max(1, storyStep - 1))
  const handleDecorate = () => {
    if (!canFinish) return
    navigate('/editor')
  }
  const handlePreview = () => {
    if (!canFinish) return
    navigate('/preview')
  }

  return (
    <div className="min-h-screen pb-32">
      <StoryProgress current={storyStep} />

      <div className="mx-auto max-w-4xl px-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex h-9 w-fit items-center gap-1.5 rounded-md px-2 text-xs text-mist-dim transition-base hover:bg-ink-card hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            返回首页
          </Link>
          <span className="hidden text-xs text-mist-dim sm:block">本地创作 · 数据不上传</span>
        </div>

        {/* 援助提示卡：文化致敬与情绪表达，不替代专业心理援助 */}
        <div className="mb-6">
          <NoticeCard />
        </div>
      </div>

      {storyStep === 1 && <RegionStep />}
      {storyStep === 2 && <StyleStep />}
      {storyStep === 3 && <DecorationStep />}
      {storyStep === 4 && <InscriptionStep />}

      {/* 底部操作栏 */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-border bg-ink-card/95 pb-3 pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 状态提示 */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {storyStep === 1 && !hasRegion ? (
              <>
                <AlertTriangle className="h-4 w-4 text-candle" aria-hidden="true" />
                <span className="text-mist-dim">请先选择一个地区再继续</span>
              </>
            ) : storyStep === 4 ? (
              canFinish ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-jade" aria-hidden="true" />
                  <span className="text-mist-soft">可以继续装饰，或直接预览</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-candle" aria-hidden="true" />
                  <span className="text-mist-dim">请填写墓志铭后再继续</span>
                </>
              )
            ) : (
              <span className="text-mist-dim">{STEP_HINT[storyStep]}</span>
            )}
          </div>

          {/* 按钮组 */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            {storyStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="btn-ghost h-10 cursor-pointer px-5 text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                上一步
              </button>
            )}
            {storyStep < 4 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canNext}
                className="btn-primary h-10 cursor-pointer px-5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                下一步
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            {storyStep === 4 && (
              <>
                <button
                  type="button"
                  onClick={handleDecorate}
                  disabled={!canFinish}
                  className="btn-secondary h-10 cursor-pointer px-5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  继续装饰
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  disabled={!canFinish}
                  className="btn-primary h-10 cursor-pointer px-5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  直接预览
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

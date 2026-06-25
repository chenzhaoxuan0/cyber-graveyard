/**
 * 故事流向导步骤进度指示器
 */
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { num: 1, label: '地区' },
  { num: 2, label: '样式' },
  { num: 3, label: '装饰' },
  { num: 4, label: '碑文' },
]

interface StoryProgressProps {
  current: number
}

export function StoryProgress({ current }: StoryProgressProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-ink-border bg-ink-soft/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-1 px-4 py-2.5 sm:gap-3">
        {STEPS.map((step, i) => {
          const isDone = current > step.num
          const isActive = current === step.num
          return (
            <div key={step.num} className="flex items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-base',
                    isDone && 'border border-jade/40 bg-jade/15 text-jade',
                    isActive && 'border border-candle/50 bg-candle/15 text-candle',
                    !isDone && !isActive && 'border border-ink-border bg-ink-card text-mist-dim'
                  )}
                >
                  {isDone ? <Check className="h-3 w-3" /> : step.num}
                </span>
                <span
                  className={cn(
                    'text-xs transition-colors',
                    isActive ? 'text-candle' : isDone ? 'text-jade' : 'text-mist-dim'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className={cn(
                    'h-px w-4 transition-colors sm:w-8',
                    current > step.num ? 'bg-jade/40' : 'bg-ink-border'
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

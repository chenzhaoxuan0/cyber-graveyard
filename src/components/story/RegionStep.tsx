/**
 * 故事流第1步：选地区
 * 每个地区展示其对生死的观念
 */
import { Check } from 'lucide-react'
import { CULTURAL_CONTENTS } from '@/data/cultural-content'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'

export function RegionStep() {
  const regionId = useAppStore((s) => s.form.regionId)
  const setForm = useAppStore((s) => s.setForm)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <p className="mb-2 font-serif text-lg leading-relaxed text-mist sm:text-xl">
          每一个故事的开始，都来自一片土地。
        </p>
        <p className="text-xs text-mist-dim">你，来自哪里？选择一片土地，听听那里的人如何看待生死。</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CULTURAL_CONTENTS.map((culture) => {
          const selected = regionId === culture.id
          return (
            <button
              key={culture.id}
              type="button"
              onClick={() => setForm({ regionId: culture.id })}
              className={cn(
                'group relative overflow-hidden rounded-xl border p-4 text-left transition-base',
                selected
                  ? 'border-candle/50 bg-candle/5 shadow-tomb'
                  : 'border-ink-border bg-ink-card/60 hover:border-ink-border hover:bg-ink-card'
              )}
              style={selected ? { borderColor: culture.palette.accent } : undefined}
            >
              {/* 顶部色条 */}
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: culture.palette.accent }}
                aria-hidden="true"
              />

              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base text-mist">{culture.regionLabel}</h3>
                  <p className="text-[11px] tracking-wider text-mist-dim">{culture.title}</p>
                </div>
                {selected && (
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ backgroundColor: culture.palette.accent }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
              </div>

              <p className="mb-3 text-sm leading-relaxed text-mist-soft">{culture.philosophy}</p>

              <div className="flex flex-wrap gap-1">
                {culture.keyConcepts.slice(0, 4).map((kc) => (
                  <span
                    key={kc}
                    className="rounded-full border border-ink-border bg-ink-soft/60 px-2 py-0.5 text-[10px] text-mist-dim"
                  >
                    {kc}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

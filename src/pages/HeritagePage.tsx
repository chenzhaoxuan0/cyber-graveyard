import { Link } from 'react-router-dom'
import { ArrowLeft, Hammer, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { HERITAGE_CRAFT_TOMBSTONES } from '@/data/tombstones'
import { TombstoneVisual } from '@/components/tombstone/TombstoneVisual'

export default function HeritagePage() {
  const [activeCraft, setActiveCraft] = useState<string | null>(null)

  const toggleCraft = (id: string) => {
    setActiveCraft((prev) => (prev === id ? null : id))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/tribute"
          className="inline-flex cursor-pointer items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回致敬区
        </Link>
        <h1 className="font-serif text-2xl text-jade">非 遗 工 艺 墓 碑</h1>
        <span className="w-16" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HERITAGE_CRAFT_TOMBSTONES.map((craft) => {
          const isOpen = activeCraft === craft.id
          return (
            <div
              key={craft.id}
              className="rounded-md border border-ink-border bg-ink-card/50 p-4 transition-base hover:border-jade/40"
            >
              <div className="mb-3 flex items-center gap-2">
                <Hammer className="h-4 w-4 text-jade" aria-hidden="true" />
                <h3 className="font-serif text-base text-mist">{craft.craft}</h3>
              </div>

              {/* 墓碑预览 */}
              <div className="mb-3 flex justify-center rounded bg-ink/60 p-3">
                <TombstoneVisual
                  template="heritage"
                  title={craft.templates[0]?.name ?? craft.craft}
                  subtitle={craft.region}
                  epitaph="匠人之心，金石可镂"
                  craft={craft.id}
                />
              </div>

              {/* 工艺小知识（点击展开，兼容触屏） */}
              <button
                type="button"
                onClick={() => toggleCraft(craft.id)}
                aria-expanded={isOpen}
                aria-controls={`craft-info-${craft.id}`}
                className="flex w-full cursor-pointer items-center justify-between rounded border border-jade-soft/40 bg-ink/60 px-3 py-2 text-xs text-jade transition-base hover:border-jade/60 hover:bg-ink-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="flex items-center gap-1.5">
                  <Info className="h-3 w-3" aria-hidden="true" />
                  工艺小知识
                </span>
                {isOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>

              <div
                id={`craft-info-${craft.id}`}
                className={`overflow-hidden transition-all duration-base ${
                  isOpen ? 'mt-2 max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="rounded border border-jade-soft/40 bg-ink/60 p-3 text-xs">
                  <p className="leading-relaxed text-mist-soft">
                    <span className="text-mist-dim">起源：</span>
                    {craft.knowledge.origin}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-mist-soft">
                    <span className="text-mist-dim">特征：</span>
                    {craft.knowledge.feature}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-mist-soft">
                    <span className="text-mist-dim">历史：</span>
                    {craft.knowledge.history}
                  </p>
                </div>
              </div>

              <Link
                to={`/create?template=${craft.id}`}
                className="mt-3 block cursor-pointer rounded border border-jade/40 bg-jade-soft/20 py-1.5 text-center text-xs text-jade transition-base hover:bg-jade-soft/40 hover:shadow-jade"
              >
                使用此工艺 →
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

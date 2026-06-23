import { Link } from 'react-router-dom'
import { ArrowLeft, Hammer, Info } from 'lucide-react'
import { useState } from 'react'
import { HERITAGE_CRAFT_TOMBSTONES } from '@/data/tombstones'
import { TombstoneVisual } from '@/components/tombstone/TombstoneVisual'

export default function HeritagePage() {
  const [activeCraft, setActiveCraft] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/tribute"
          className="inline-flex items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回致敬区
        </Link>
        <h1 className="font-serif text-2xl text-jade">非 遗 工 艺 墓 碑</h1>
        <span className="w-16" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HERITAGE_CRAFT_TOMBSTONES.map((craft) => (
          <div
            key={craft.id}
            className="rounded border border-ink-card bg-ink-card/40 p-4 transition-all hover:border-jade/40"
            onMouseEnter={() => setActiveCraft(craft.id)}
            onMouseLeave={() => setActiveCraft(null)}
          >
            <div className="mb-3 flex items-center gap-2">
              <Hammer className="h-4 w-4 text-jade" />
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

            {/* 工艺小知识（hover/tap 显示） */}
            <div
              className={`overflow-hidden transition-all ${
                activeCraft === craft.id ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="rounded border border-jade-soft/40 bg-ink/60 p-2 text-xs">
                <div className="mb-1 flex items-center gap-1">
                  <Info className="h-3 w-3 text-jade" />
                  <span className="text-jade">工艺小知识</span>
                </div>
                <p className="leading-relaxed text-mist-soft">
                  <span className="text-mist-dim">起源：</span>
                  {craft.knowledge.origin}
                </p>
                <p className="mt-1 leading-relaxed text-mist-soft">
                  <span className="text-mist-dim">特征：</span>
                  {craft.knowledge.feature}
                </p>
                <p className="mt-1 leading-relaxed text-mist-soft">
                  <span className="text-mist-dim">历史：</span>
                  {craft.knowledge.history}
                </p>
              </div>
            </div>

            <Link
              to={`/create?template=${craft.id}`}
              className="mt-3 block rounded border border-jade/40 bg-jade-soft/20 py-1.5 text-center text-xs text-jade transition-colors hover:bg-jade-soft/40"
            >
              使用此工艺 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

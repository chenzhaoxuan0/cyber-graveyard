import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Hammer, Info, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react'
import { HERITAGE_CRAFT_TOMBSTONES } from '@/data/tombstones'
import { TombstoneIllustration } from '@/components/tombstone/TombstoneIllustration'

function mapCraftToVariant(
  id: string,
):
  | 'default'
  | 'huian-stone'
  | 'huizhou-brick'
  | 'suzhou-stele'
  | 'miao-silver'
  | 'yi-lacquer' {
  if (id.includes('huian')) return 'huian-stone'
  if (id.includes('huizhou')) return 'huizhou-brick'
  if (id.includes('suzhou')) return 'suzhou-stele'
  if (id.includes('miao')) return 'miao-silver'
  if (id.includes('yi')) return 'yi-lacquer'
  return 'default'
}

export default function HeritagePage() {
  const [activeCraft, setActiveCraft] = useState<string | null>(null)

  const toggleCraft = (id: string) => {
    setActiveCraft((prev) => (prev === id ? null : id))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 页头 */}
      <header className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            to="/tribute"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wider text-mist-dim uppercase transition-colors hover:text-mist"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            返回展厅
          </Link>
          <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-mist sm:text-4xl lg:text-5xl">
            非遗工艺墓碑
          </h1>
          <p className="max-w-lg font-serif text-base leading-relaxed text-mist-soft sm:text-lg">
            国家级非遗工艺与纪念之物的相遇，每一种刀法与纹样都在讲述匠人对生死的理解。
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-jade/30 bg-jade/8 px-4 py-2 text-sm font-medium text-jade">
          <Hammer className="h-4 w-4" aria-hidden="true" />
          {HERITAGE_CRAFT_TOMBSTONES.length} 种工艺
        </div>
      </header>

      {/* 工艺卡片网格 */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="非遗工艺展示">
        {HERITAGE_CRAFT_TOMBSTONES.map((craft, index) => {
          const isOpen = activeCraft === craft.id
          return (
            <article
              key={craft.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-card animate-fade-in transition-all duration-500 ease-out-quart hover:-translate-y-1.5 hover:border-mist-muted hover:shadow-[0_24px_48px_-12px_rgba(61,58,53,0.12)]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* 预览区 */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                <div
                  className="absolute inset-0 opacity-60 transition-transform duration-700 ease-out-quart group-hover:scale-105"
                  style={{
                    background:
                      'radial-gradient(circle at 80% 20%, rgba(107,142,107,0.18), transparent 35%), radial-gradient(circle at 20% 80%, rgba(138,184,138,0.08), transparent 30%), linear-gradient(180deg, #fffcf7 0%, #f0ece3 100%)',
                  }}
                />

                {/* 简化墓碑插画 */}
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <TombstoneIllustration variant={mapCraftToVariant(craft.id)} className="h-[72%] w-auto transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]" />
                </div>

                {/* 徽章 */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-ink-border bg-ink-card/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-mist-soft backdrop-blur-sm">
                    非遗工艺
                  </span>
                  <span className="rounded-full bg-jade/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-jade">
                    {craft.templates.length} 款样式
                  </span>
                </div>
              </div>

              {/* 内容区 */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3">
                  <h2 className="mb-1 font-serif text-lg font-medium tracking-wide text-mist">{craft.craft}</h2>
                  <p className="text-xs font-medium tracking-wider text-mist-dim uppercase">{craft.region}</p>
                </div>

                {/* 工艺小知识（展开/收起） */}
                <button
                  type="button"
                  onClick={() => toggleCraft(craft.id)}
                  aria-expanded={isOpen}
                  aria-controls={`craft-info-${craft.id}`}
                  className="mt-auto flex w-full items-center justify-between rounded-xl border border-ink-border bg-ink-soft/50 px-3 py-2.5 text-xs font-medium text-mist-soft transition-all duration-300 hover:border-jade/40 hover:bg-ink-soft hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink-card"
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
                  className={`overflow-hidden transition-all duration-500 ease-out-quart ${
                    isOpen ? 'mt-3 max-h-72 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-2.5 rounded-xl border border-jade/20 bg-jade/5 p-3.5 text-xs leading-relaxed text-mist-soft">
                    <p>
                      <span className="font-medium text-mist-dim">起源：</span>
                      {craft.knowledge.origin}
                    </p>
                    <p>
                      <span className="font-medium text-mist-dim">特征：</span>
                      {craft.knowledge.feature}
                    </p>
                    <p>
                      <span className="font-medium text-mist-dim">历史：</span>
                      {craft.knowledge.history}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/create?template=${craft.id}`}
                  className="mt-4 group/btn inline-flex items-center justify-center gap-1.5 rounded-full border border-jade/40 bg-jade/10 py-2.5 text-sm font-medium text-jade transition-all duration-300 hover:bg-jade/15"
                >
                  使用此工艺
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}

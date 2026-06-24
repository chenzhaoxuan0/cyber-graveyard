import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Hammer, Sparkles, ArrowUpRight } from 'lucide-react'
import { LITERARY_IP_TOMBSTONES, HERITAGE_CRAFT_TOMBSTONES } from '@/data/tombstones'
import { TombstoneCard } from '@/components/tombstone/TombstoneCard'

type FilterTab = 'all' | 'literary' | 'heritage'

const FILTER_TABS: { key: FilterTab; label: string; count: number }[] = [
  { key: 'all', label: '全部', count: LITERARY_IP_TOMBSTONES.length + HERITAGE_CRAFT_TOMBSTONES.length },
  { key: 'literary', label: '文学 IP', count: LITERARY_IP_TOMBSTONES.length },
  { key: 'heritage', label: '非遗工艺', count: HERITAGE_CRAFT_TOMBSTONES.length },
]

export default function TributePage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const literaryItems = useMemo(
    () =>
      LITERARY_IP_TOMBSTONES.map((t) => ({
        id: t.id,
        to: `/tribute/literary/${t.id}`,
        title: t.character,
        subtitle: t.work,
        epitaph: t.epitaph,
        accent: mapStyleToAccent(t.style),
        variant: mapStyleToVariant(t.style),
        category: '文学 IP',
        badge: t.role,
      })),
    [],
  )

  const heritageItems = useMemo(
    () =>
      HERITAGE_CRAFT_TOMBSTONES.map((t) => ({
        id: t.id,
        to: `/tribute/heritage`,
        title: t.craft,
        subtitle: t.region,
        epitaph: '匠人之心，金石可镂',
        accent: 'jade' as const,
        variant: mapCraftToVariant(t.id),
        category: '非遗工艺',
        badge: `${t.templates.length} 款样式`,
      })),
    [],
  )

  const visibleItems = useMemo(() => {
    if (activeTab === 'literary') return literaryItems
    if (activeTab === 'heritage') return heritageItems
    return [...literaryItems, ...heritageItems]
  }, [activeTab, literaryItems, heritageItems])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 页头 */}
      <header className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wider text-mist-dim uppercase transition-colors hover:text-mist"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            返回首页
          </Link>
          <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-mist sm:text-4xl lg:text-5xl">
            墓园展厅
          </h1>
          <p className="max-w-lg font-serif text-base leading-relaxed text-mist-soft sm:text-lg">
            每一块墓碑都是一则被定格的故事，安静等待被阅读。
          </p>
        </div>

        <Link
          to="/create"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-ink-border bg-ink-card px-5 py-2.5 text-sm font-medium text-mist shadow-tomb transition-all duration-500 ease-out-quart hover:-translate-y-0.5 hover:border-mist-muted hover:shadow-[0_16px_32px_-12px_rgba(61,58,53,0.12)]"
        >
          <Sparkles className="h-4 w-4 text-candle" aria-hidden="true" />
          创作我的墓碑
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </header>

      {/* 分类筛选 */}
      <div className="mb-8 flex flex-wrap items-center gap-2 sm:mb-10">
        {FILTER_TABS.map((tab) => {
          const active = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                active
                  ? 'bg-mist text-ink-card shadow-tomb'
                  : 'border border-ink-border bg-ink-card text-mist-soft hover:border-mist-muted hover:text-mist'
              }`}
              aria-pressed={active}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                  active ? 'bg-ink-card/20 text-ink-card' : 'bg-ink-soft text-mist-dim'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* 画廊网格 */}
      <section
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="墓碑展示"
      >
        {visibleItems.map((item, index) => (
          <Link
            key={`${activeTab}-${item.id}`}
            to={item.to}
            className="block animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <TombstoneCard
              title={item.title}
              subtitle={item.subtitle}
              epitaph={item.epitaph}
              accent={item.accent}
              variant={item.variant}
              category={item.category}
              badge={item.badge}
            />
          </Link>
        ))}
      </section>

      {/* 空状态（理论上不会出现） */}
      {visibleItems.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-serif text-mist-soft">暂无该分类的墓碑</p>
        </div>
      )}

      {/* 非遗工艺专区入口 */}
      {activeTab !== 'heritage' && (
        <section className="mt-16 sm:mt-20">
          <div className="garden-frame relative overflow-hidden rounded-2xl border border-ink-border bg-ink-card/40 p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-jade/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-candle/8 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-jade">
                  <Hammer className="h-3.5 w-3.5" aria-hidden="true" />
                  传统工艺
                </div>
                <h2 className="mb-2 font-serif text-2xl text-mist sm:text-3xl">非遗工艺墓碑</h2>
                <p className="max-w-md text-sm leading-relaxed text-mist-soft">
                  惠安石雕、徽州砖雕、苏州碑刻、苗族银饰、彝族漆器——五种国家级非遗工艺，呈现不同的纪念美学。
                </p>
              </div>
              <Link
                to="/tribute/heritage"
                className="group inline-flex items-center gap-2 rounded-full border border-jade/40 bg-jade/10 px-5 py-2.5 text-sm font-medium text-jade transition-all duration-300 hover:bg-jade/15"
              >
                查看全部
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

/** 将文学 IP 的 style token 映射为展示用 accent */
function mapStyleToAccent(style: string): string {
  if (style.includes('dumbledore')) return 'candle'
  if (style.includes('daiyu')) return 'neon-magenta'
  if (style.includes('prince')) return 'candle'
  if (style.includes('wukong')) return 'bronze'
  if (style.includes('quixote')) return 'blood'
  return 'candle'
}

/** 将文学 IP 的 style token 映射为墓碑造型变体 */
function mapStyleToVariant(
  style: string,
):
  | 'default'
  | 'dumbledore'
  | 'daiyu'
  | 'prince'
  | 'wukong'
  | 'quixote' {
  if (style.includes('dumbledore')) return 'dumbledore'
  if (style.includes('daiyu')) return 'daiyu'
  if (style.includes('prince')) return 'prince'
  if (style.includes('wukong')) return 'wukong'
  if (style.includes('quixote')) return 'quixote'
  return 'default'
}

/** 将非遗工艺 id 映射为墓碑造型变体 */
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

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Globe, BookOpen, Sparkles, Heart, Eye, MapPin } from 'lucide-react'
import { CULTURAL_CONTENTS, SYMBOL_ENTRIES } from '@/data/cultural-content'
import type { SymbolEntry } from '@/types'

const CATEGORY_TABS = [
  { key: 'all', label: '全部' },
  { key: 'plant', label: '植物' },
  { key: 'animal', label: '动物' },
  { key: 'object', label: '物品' },
  { key: 'architectural', label: '建筑' },
] as const

const CATEGORY_LABELS: Record<string, string> = {
  plant: '植物',
  animal: '动物',
  object: '物品',
  architectural: '建筑',
}

export default function CulturePage() {
  const [activeTab, setActiveTab] = useState<string>('all')

  const filteredSymbols: SymbolEntry[] =
    activeTab === 'all'
      ? SYMBOL_ENTRIES
      : SYMBOL_ENTRIES.filter((s) => s.category === activeTab)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 页头 */}
      <header className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wider text-mist-dim uppercase transition-colors hover:text-mist"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            返回首页
          </Link>
          <h1 className="mb-3 font-serif text-3xl font-medium tracking-tight text-mist sm:text-4xl lg:text-5xl">
            死亡文化图鉴
          </h1>
          <p className="max-w-lg font-serif text-base leading-relaxed text-mist-soft sm:text-lg">
            每一块墓碑背后，都是一种文明对生命终极问题的回答
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-jade/30 bg-jade/8 px-4 py-2 text-sm font-medium text-jade">
          <Globe className="h-4 w-4" aria-hidden="true" />
          {CULTURAL_CONTENTS.length} 种文化体系
        </div>
      </header>

      {/* 文化网格 */}
      <section className="mb-16" aria-label="死亡文化展示">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-candle" aria-hidden="true" />
          <h2 className="font-serif text-lg text-mist">文化体系</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CULTURAL_CONTENTS.map((culture, index) => (
            <article
              key={culture.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-card animate-fade-in transition-all duration-500 ease-out-quart hover:-translate-y-1.5 hover:border-mist-muted hover:shadow-[0_24px_48px_-12px_rgba(61,58,53,0.12)]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* 顶部色彩条 */}
              <div
                className="h-2 w-full"
                style={{ backgroundColor: culture.palette.accent }}
              />

              {/* 内容区 */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full border border-jade/30 bg-jade/8 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-jade">
                      {culture.regionLabel}
                    </span>
                    <MapPin className="h-3 w-3 text-mist-muted" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base font-medium tracking-wide text-mist">
                    {culture.title}
                  </h3>
                </div>

                <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-mist-soft">
                  {culture.philosophy}
                </p>

                {/* 关键概念 */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {culture.keyConcepts.slice(0, 3).map((kc) => (
                    <span
                      key={kc}
                      className="rounded-full border border-candle/30 bg-candle/8 px-2 py-0.5 text-[10px] text-candle-soft"
                    >
                      {kc}
                    </span>
                  ))}
                  {culture.keyConcepts.length > 3 && (
                    <span className="rounded-full border border-ink-border bg-ink-soft/50 px-2 py-0.5 text-[10px] text-mist-dim">
                      +{culture.keyConcepts.length - 3}
                    </span>
                  )}
                </div>

                {/* 趣闻数量 */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-mist-dim">
                    <Sparkles className="h-3 w-3 text-candle" aria-hidden="true" />
                    <span>{culture.funFacts.length} 条文化趣闻</span>
                  </div>
                  <Link
                    to={`/culture/${culture.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-candle transition-colors hover:text-candle-soft"
                  >
                    <Eye className="h-3 w-3" aria-hidden="true" />
                    查看详情
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 符号词典 */}
      <section aria-label="墓碑符号词典">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Heart className="h-4 w-4 text-candle" aria-hidden="true" />
            <h2 className="font-serif text-2xl text-mist sm:text-3xl">墓碑符号词典</h2>
          </div>
          <p className="text-sm text-mist-dim">
            墓碑上的每一个符号都有其深意，它们是逝者与生者之间沉默的对话。
          </p>
        </div>

        {/* 分类标签 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-base ${
                activeTab === tab.key
                  ? 'border-candle/40 bg-candle/10 text-candle'
                  : 'border-ink-border bg-ink-soft/50 text-mist-soft hover:border-mist-muted hover:text-mist'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 符号卡片网格 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSymbols.map((symbol) => (
            <article
              key={symbol.id}
              className="group flex items-start gap-3 rounded-xl border border-ink-border bg-ink-card/40 p-4 shadow-tomb transition-base hover:-translate-y-1 hover:border-mist-muted hover:shadow-tomb-lg"
            >
              {/* 图标 */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-border bg-ink-soft/50 text-xl">
                {symbol.icon}
              </div>

              {/* 信息 */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h4 className="font-serif text-sm font-medium text-mist">{symbol.name}</h4>
                  <span className="text-[10px] text-mist-muted">{symbol.nameEn}</span>
                </div>
                <p className="mb-1.5 text-xs leading-relaxed text-mist-soft">{symbol.meaning}</p>
                <div className="flex items-center gap-2 text-[10px] text-mist-dim">
                  <span className="rounded-full border border-ink-border bg-ink-soft/50 px-1.5 py-0.5">
                    {CATEGORY_LABELS[symbol.category]}
                  </span>
                  <span className="rounded-full border border-candle/20 bg-candle/6 px-1.5 py-0.5 text-candle-soft">
                    {symbol.commonIn}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredSymbols.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-mist-dim">该分类下暂无符号</p>
          </div>
        )}
      </section>

      {/* 底部 */}
      <div className="mt-16 border-t border-ink-border pt-8 text-center">
        <p className="mb-4 font-serif text-sm text-mist-dim">
          理解死亡，是为了更好地活着
        </p>
        <Link to="/create" className="btn-primary cursor-pointer">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          做我的墓碑
        </Link>
      </div>
    </div>
  )
}
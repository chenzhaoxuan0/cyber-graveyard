import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Globe, BookOpen, Sparkles, Lightbulb, MapPin, Tag, Eye } from 'lucide-react'
import { CULTURAL_CONTENTS } from '@/data/cultural-content'
import { TOMBSTONE_FORMS } from '@/data/tombstone-forms'

export default function CultureDetailPage() {
  const { id } = useParams<{ id: string }>()
  const culture = CULTURAL_CONTENTS.find((c) => c.id === id)

  if (!culture) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="mb-4 font-serif text-3xl text-mist">文化未找到</h1>
        <p className="mb-8 text-mist-soft">该文化条目不存在或已被移除</p>
        <Link to="/culture" className="btn-primary">
          <ArrowLeft className="h-4 w-4" />
          返回文化图鉴
        </Link>
      </div>
    )
  }

  const relatedForms = TOMBSTONE_FORMS.filter((f) =>
    culture.relatedFormIds.includes(f.id)
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 返回链接 */}
      <Link
        to="/culture"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium tracking-wider text-mist-dim uppercase transition-colors hover:text-mist"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        返回文化图鉴
      </Link>

      {/* 页头 */}
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full border border-jade/30 bg-jade/8 px-3 py-1 text-xs font-medium text-jade">
            {culture.regionLabel}
          </span>
          <Globe className="h-4 w-4 text-mist-muted" aria-hidden="true" />
        </div>
        <h1 className="mb-4 font-serif text-3xl font-medium tracking-tight text-mist sm:text-4xl">
          {culture.title}
        </h1>
        <div
          className="h-1 w-24 rounded-full"
          style={{ backgroundColor: culture.palette.accent }}
        />
      </header>

      {/* 死亡哲学 */}
      <section className="mb-10" aria-label="死亡哲学">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-candle" aria-hidden="true" />
          <h2 className="font-serif text-lg text-mist">死亡哲学</h2>
        </div>
        <div className="rounded-2xl border border-ink-border bg-ink-card/60 p-6">
          <p className="font-serif leading-relaxed text-mist-soft sm:text-lg">
            {culture.philosophy}
          </p>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="mb-10" aria-label="核心概念">
        <div className="mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4 text-candle" aria-hidden="true" />
          <h2 className="font-serif text-lg text-mist">核心概念</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {culture.keyConcepts.map((kc) => (
            <span
              key={kc}
              className="rounded-full border border-candle/30 bg-candle/8 px-3 py-1.5 text-sm font-medium text-candle"
            >
              {kc}
            </span>
          ))}
        </div>
      </section>

      {/* 丧葬仪式 */}
      <section className="mb-10" aria-label="丧葬仪式">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-candle" aria-hidden="true" />
          <h2 className="font-serif text-lg text-mist">丧葬仪式</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {culture.rituals.map((ritual, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-ink-border bg-ink-card/40 p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-candle/20 bg-candle/8 text-xs font-medium text-candle">
                {i + 1}
              </span>
              <span className="text-sm text-mist-soft">{ritual}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 墓碑含义 */}
      <section className="mb-10" aria-label="墓碑含义">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-candle" aria-hidden="true" />
          <h2 className="font-serif text-lg text-mist">墓碑的含义</h2>
        </div>
        <div className="rounded-2xl border border-ink-border bg-ink-card/60 p-6">
          <p className="font-serif leading-relaxed text-mist-soft">
            {culture.tombstoneMeaning}
          </p>
        </div>
      </section>

      {/* 文化趣闻 */}
      <section className="mb-10" aria-label="文化趣闻">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-candle" aria-hidden="true" />
          <h2 className="font-serif text-lg text-mist">文化趣闻</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {culture.funFacts.map((fact, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-ink-border bg-ink-card/40 p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-candle/10 text-[10px] font-bold text-candle">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-mist-soft">{fact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 关联墓碑形式 */}
      {relatedForms.length > 0 && (
        <section className="mb-10" aria-label="关联墓碑形式">
          <div className="mb-4 flex items-center gap-2">
            <Eye className="h-4 w-4 text-candle" aria-hidden="true" />
            <h2 className="font-serif text-lg text-mist">关联墓碑形式</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedForms.map((form) => (
              <Link
                key={form.id}
                to={`/forms/${form.id}`}
                className="group flex items-center gap-4 rounded-xl border border-ink-border bg-ink-card/40 p-4 transition-base hover:-translate-y-1 hover:border-mist-muted hover:shadow-tomb-lg"
              >
                <div
                  className="h-10 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: form.palette.accent }}
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-sm font-medium text-mist">{form.name}</h4>
                  <p className="text-xs text-mist-muted">{form.nameEn}</p>
                </div>
                <span className="shrink-0 text-xs text-mist-dim">查看 →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 底部 */}
      <div className="mt-12 border-t border-ink-border pt-8 text-center">
        <p className="mb-4 font-serif text-sm text-mist-dim">
          理解死亡，是为了更好地活着
        </p>
        <Link to="/culture" className="btn-primary cursor-pointer">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          返回文化图鉴
        </Link>
      </div>
    </div>
  )
}
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Moon, Package, Film, MessageSquare, Sparkles } from 'lucide-react'
import { LITERARY_IP_TOMBSTONES } from '@/data/tombstones'
import { TombstoneVisual } from '@/components/tombstone/TombstoneVisual'
import { QuoteBubble } from '@/components/tombstone/QuoteBubble'

export default function LiteraryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const nightMode = true // 默认夜间模式，与赛博墓园主题一致
  const tombstone = LITERARY_IP_TOMBSTONES.find((t) => t.id === id)

  if (!tombstone) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="mb-4 font-serif text-2xl text-blood">墓碑未找到</p>
        <Link to="/tribute" className="cursor-pointer text-sm text-candle hover:underline">
          ← 返回致敬区
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 顶部导航 */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/tribute"
          className="inline-flex cursor-pointer items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回致敬区
        </Link>
        <h1 className="font-serif text-xl tracking-[0.2em] text-candle">文 学 IP 墓 碑</h1>
        <div className="inline-flex items-center gap-1.5 rounded border border-mist-dim/40 px-2 py-1 text-xs text-mist-soft">
          <Moon className="h-3 w-3 text-candle" aria-hidden="true" />
          夜间模式
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 左侧：墓碑主视觉 */}
        <div className="flex items-center justify-center rounded-md border border-ink-border bg-ink-card/40 p-6 shadow-tomb">
          <TombstoneVisual
            template="literary"
            title={tombstone.character}
            subtitle={tombstone.work}
            epitaph={tombstone.epitaph}
            nightMode={nightMode}
          />
        </div>

        {/* 右侧：信息区 */}
        <div className="space-y-4">
          {/* 标题卡 */}
          <div className="rounded-md border border-candle/30 bg-ink-card/40 p-5 shadow-tomb">
            <h2 className="font-serif text-2xl tracking-[0.15em] text-candle">{tombstone.character}</h2>
            <p className="mt-1 text-xs text-mist-soft">{tombstone.work}</p>
            {tombstone.role && (
              <p className="mt-0.5 text-xs text-mist-dim">{tombstone.role}</p>
            )}
          </div>

          {/* 墓志铭 */}
          <div className="rounded-md border border-ink-border bg-ink-card/40 p-4">
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-candle" aria-hidden="true" />
              <h3 className="font-serif text-sm text-mist">墓志铭</h3>
            </div>
            <p className="font-serif text-base italic leading-relaxed text-mist-soft">
              「{tombstone.epitaph}」
            </p>
            {tombstone.lifespan && (
              <p className="mt-2 text-right font-mono text-xs text-mist-dim">{tombstone.lifespan}</p>
            )}
          </div>

          {/* 四象限信息 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-ink-border bg-ink-card/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Package className="h-3.5 w-3.5 text-jade" aria-hidden="true" />
                <h4 className="text-xs font-medium text-mist">生前遗物</h4>
              </div>
              <ul className="space-y-1 text-xs leading-relaxed text-mist-soft">
                {tombstone.relics.map((b, i) => (
                  <li key={i}>· {b}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-ink-border bg-ink-card/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Film className="h-3.5 w-3.5 text-blood" aria-hidden="true" />
                <h4 className="text-xs font-medium text-mist">名场面</h4>
              </div>
              <ul className="space-y-1 text-xs leading-relaxed text-mist-soft">
                {tombstone.scenes.map((s, i) => (
                  <li key={i}>· {s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-ink-border bg-ink-card/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-candle" aria-hidden="true" />
                <h4 className="text-xs font-medium text-mist">经典台词</h4>
              </div>
              <div className="space-y-2">
                {tombstone.quotes.map((q, i) => (
                  <QuoteBubble key={i} text={q.text} context={q.context} />
                ))}
              </div>
            </div>
            <div className="rounded-md border border-ink-border bg-ink-card/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
                <h4 className="text-xs font-medium text-mist">临终场景</h4>
              </div>
              <p className="text-xs leading-relaxed text-mist-soft">
                {tombstone.deathScene}
              </p>
            </div>
          </div>

          {/* 版权声明 */}
          <p className="text-center text-[10px] text-mist-dim">
            角色基于公有领域或转化性使用标注，仅作戏谑致敬
          </p>
        </div>
      </div>
    </div>
  )
}

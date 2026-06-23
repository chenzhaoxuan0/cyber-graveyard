import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Hammer } from 'lucide-react'
import { LITERARY_IP_TOMBSTONES } from '@/data/tombstones'
import { TombstoneCard } from '@/components/tombstone/TombstoneCard'

export default function TributePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-mist-dim transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回首页
        </Link>
        <h1 className="font-serif text-2xl text-candle">致 敬 区</h1>
        <span className="w-16" />
      </div>

      {/* 文学 IP 墓碑 */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-candle" />
          <h2 className="font-serif text-xl text-mist">文学 IP 墓碑</h2>
          <span className="text-xs text-mist-dim">（5 位经典角色）</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LITERARY_IP_TOMBSTONES.map((t) => (
            <Link key={t.id} to={`/tribute/literary/${t.id}`}>
              <TombstoneCard
                title={t.character}
                subtitle={t.work}
                epitaph={t.epitaph}
                accent="candle"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* 非遗工艺入口 */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Hammer className="h-5 w-5 text-jade" />
          <h2 className="font-serif text-xl text-mist">非遗工艺墓碑</h2>
          <span className="text-xs text-mist-dim">（5 种非遗工艺）</span>
        </div>
        <Link
          to="/tribute/heritage"
          className="block rounded border border-jade-soft/40 bg-ink-card/40 p-6 transition-all hover:border-jade/60 hover:bg-ink-card/60"
        >
          <p className="text-sm leading-relaxed text-mist-soft">
            惠安石雕、徽州砖雕、苏州碑刻、苗族银饰、彝族漆器——查看 5 种非遗工艺呈现的墓碑样式与工艺小知识。
          </p>
          <span className="mt-3 inline-block text-xs text-jade">查看全部 →</span>
        </Link>
      </section>
    </div>
  )
}

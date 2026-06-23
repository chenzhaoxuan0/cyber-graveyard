import { Link } from 'react-router-dom'
import { BookOpen, Hammer, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero 区 */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
        {/* 背景烛光 */}
        <div className="pointer-events-none absolute inset-0 bg-grain" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-candle/5 blur-3xl" />

        <div className="relative z-10 animate-fade-in">
          <p className="mb-4 font-mono text-xs tracking-[0.4em] text-mist-dim">
            CYBER · GRAVEYARD
          </p>
          <h1 className="mb-6 font-serif text-5xl text-candle shadow-candle sm:text-7xl">
            赛 博 墓 园
          </h1>
          <p className="mx-auto mb-2 max-w-2xl font-serif text-lg leading-relaxed text-mist sm:text-2xl">
            给 活 着 的 人
          </p>
          <p className="mx-auto mb-10 max-w-2xl font-serif text-lg leading-relaxed text-mist sm:text-2xl">
            做 一 块 提 前 的 彩 排 墓 碑
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/tribute"
              className="group inline-flex w-full items-center justify-center gap-2 rounded border border-mist-dim/40 bg-ink-card/60 px-6 py-3 font-serif text-base text-mist transition-all hover:border-candle hover:text-candle sm:w-auto"
            >
              <BookOpen className="h-4 w-4" />
              逛 墓 园
            </Link>
            <Link
              to="/create"
              className="group inline-flex w-full items-center justify-center gap-2 rounded border border-candle/60 bg-candle/10 px-6 py-3 font-serif text-base text-candle shadow-candle transition-all hover:bg-candle/20 sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              做 我 的 墓 碑
            </Link>
          </div>
        </div>
      </section>

      {/* 三栏入口 */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to="/tribute"
            className="group rounded border border-ink-card bg-ink-card/40 p-6 transition-all hover:border-candle/40 hover:bg-ink-card/60"
          >
            <BookOpen className="mb-3 h-6 w-6 text-candle" />
            <h3 className="mb-2 font-serif text-lg text-mist">文学 IP 墓碑</h3>
            <p className="text-xs leading-relaxed text-mist-soft">
              邓布利多、甘道夫、林黛玉……5 位经典角色的赛博墓碑，含墓志铭与生前遗物。
            </p>
          </Link>
          <Link
            to="/tribute/heritage"
            className="group rounded border border-ink-card bg-ink-card/40 p-6 transition-all hover:border-jade/40 hover:bg-ink-card/60"
          >
            <Hammer className="mb-3 h-6 w-6 text-jade" />
            <h3 className="mb-2 font-serif text-lg text-mist">非遗工艺墓碑</h3>
            <p className="text-xs leading-relaxed text-mist-soft">
              惠安石雕、青田石雕、徽州砖雕……5 种非遗工艺呈现的墓碑样式与工艺知识。
            </p>
          </Link>
          <Link
            to="/create"
            className="group rounded border border-ink-card bg-ink-card/40 p-6 transition-all hover:border-blood/40 hover:bg-ink-card/60"
          >
            <Sparkles className="mb-3 h-6 w-6 text-blood" />
            <h3 className="mb-2 font-serif text-lg text-mist">做我的墓碑</h3>
            <p className="text-xs leading-relaxed text-mist-soft">
              选模板 → 填碑文 → 拖拽 DIY → 导出长图或视频，30 秒带走属于你的纪念品。
            </p>
          </Link>
        </div>
      </section>

      {/* 工具说明 */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded border border-ink-card bg-ink-card/40 p-6 text-center">
          <h2 className="mb-4 font-serif text-xl text-candle">纯工具型 · 即做即走</h2>
          <div className="grid grid-cols-2 gap-4 text-xs text-mist-soft sm:grid-cols-4">
            <div>
              <div className="mb-1 font-mono text-candle">零后端</div>
              <div>纯前端部署</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-candle">零登录</div>
              <div>无需注册</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-candle">零存储</div>
              <div>关闭即丢</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-candle">零 AI</div>
              <div>用户即兴创作</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

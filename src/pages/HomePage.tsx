import { Link } from 'react-router-dom'
import { BookOpen, Hammer, Sparkles, ArrowRight, Terminal, Zap } from 'lucide-react'

const entryCards = [
  {
    to: '/tribute',
    icon: BookOpen,
    iconColor: 'text-neon-cyan',
    iconBg: 'bg-neon-cyan/10',
    title: '文学 IP 墓碑',
    desc: '邓布利多、甘道夫、林黛玉……5 位经典角色的赛博墓碑，含墓志铭与生前遗物。',
  },
  {
    to: '/tribute/heritage',
    icon: Hammer,
    iconColor: 'text-neon-magenta',
    iconBg: 'bg-neon-magenta/10',
    title: '非遗工艺墓碑',
    desc: '惠安石雕、青田石雕、徽州砖雕……5 种非遗工艺呈现的墓碑样式与工艺知识。',
  },
  {
    to: '/create',
    icon: Sparkles,
    iconColor: 'text-candle',
    iconBg: 'bg-candle/10',
    title: '做我的墓碑',
    desc: '选模板 → 填碑文 → 拖拽 DIY → 导出长图或视频，30 秒带走属于你的纪念品。',
  },
]

const features = [
  { label: '零后端', desc: '纯前端部署', accent: 'text-neon-cyan' },
  { label: '零登录', desc: '无需注册', accent: 'text-neon-magenta' },
  { label: '零存储', desc: '关闭即丢', accent: 'text-neon-green' },
  { label: '零 AI', desc: '用户即兴创作', accent: 'text-candle' },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero 区 */}
      <section className="scanlines relative flex min-h-[84vh] flex-col items-center justify-center px-4 py-20 text-center">
        {/* 背景霓虹光晕 */}
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-60" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/4 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[30vh] w-[30vh] rounded-full bg-neon-magenta/4 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-[20vh] w-[20vh] rounded-full bg-candle/4 blur-3xl" />

        <div className="relative z-10 animate-fade-in">
          {/* 终端标签 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1.5">
            <Terminal className="h-3.5 w-3.5 text-neon-cyan" aria-hidden="true" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan-dim uppercase">
              SYSTEM://CYBER_GRAVEYARD
            </span>
            <span className="ml-1 inline-block h-3 w-1.5 bg-neon-cyan animate-cursor" aria-hidden="true" />
          </div>

          {/* 主标题 - 统一霓虹光效，避免逐字闪烁造成视觉噪音 */}
          <h1 className="mb-6 font-serif text-5xl font-medium leading-tight sm:text-7xl md:text-8xl">
            <span className="neon-glow-cyan text-neon-cyan">赛博墓园</span>
          </h1>

          {/* 副标题 */}
          <div className="mx-auto mb-10 max-w-xl">
            <p className="font-serif text-xl leading-relaxed text-mist-soft sm:text-2xl">
              给活着的人，做一块提前的
              <span className="text-neon-cyan neon-glow-cyan">彩排墓碑</span>
            </p>
          </div>

          {/* CTA 按钮 */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/tribute" className="btn-secondary w-full cursor-pointer sm:w-auto">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              逛墓园
            </Link>
            <Link to="/create" className="btn-primary group w-full cursor-pointer sm:w-auto">
              <Zap className="h-4 w-4" aria-hidden="true" />
              做我的墓碑
              <ArrowRight
                className="h-4 w-4 transition-transform duration-base group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-fade-in text-mist-dim">
          <div className="flex flex-col items-center gap-2 text-xs font-mono tracking-wider">
            <span className="text-neon-cyan/50">&gt; SCROLL_DOWN</span>
            <div className="h-8 w-px bg-gradient-to-b from-neon-cyan/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* 三栏入口 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">
            &gt; EXPLORE_MODES
          </p>
          <h2 className="font-serif text-2xl text-neon-cyan sm:text-3xl">三种进入方式</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {entryCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group terminal-frame relative cursor-pointer overflow-hidden rounded-md bg-ink-card/60 p-6 card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {/* 扫描线叠加 */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,240,0.02) 2px, rgba(0,255,240,0.02) 4px)',
                }} />

                <div className="relative z-10">
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-sm ${card.iconBg} transition-transform duration-base group-hover:scale-105`}
                    style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
                  >
                    <Icon className={`h-5 w-5 ${card.iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg text-mist">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-mist-soft">{card.desc}</p>
                  <div className={`mt-4 inline-flex items-center gap-1 text-xs font-mono ${card.iconColor} opacity-0 transition-opacity duration-base group-hover:opacity-100`}>
                    <span>&gt; ENTER_</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 工具说明 */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="terminal-frame relative overflow-hidden rounded-md bg-ink-card/40 p-8 shadow-tomb sm:p-10">
          {/* 背景霓虹 */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-cyan/4 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-neon-magenta/4 blur-2xl" />

          <div className="relative text-center">
            <p className="mb-2 font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">
              &gt; SYSTEM_PROMISE
            </p>
            <h2 className="mb-2 font-serif text-2xl text-neon-cyan sm:text-3xl">纯工具型 · 即做即走</h2>
            <p className="mb-8 font-mono text-xs text-mist-dim">NO_BACKEND · NO_LOGIN · NO_STORAGE · NO_AI</p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {features.map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-md border border-ink-border bg-ink-soft/50 p-4 transition-base hover:border-mist-muted hover:bg-ink-soft"
                >
                  <div className={`mb-1 font-mono text-sm ${item.accent}`}>{item.label}</div>
                  <div className="text-xs text-mist-soft">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { BookOpen, Hammer, Sparkles, ArrowRight, Flower2 } from 'lucide-react'

const entryCards = [
  {
    to: '/tribute',
    icon: BookOpen,
    iconColor: 'text-jade',
    iconBg: 'bg-jade/10',
    borderColor: 'hover:border-jade/40',
    title: '文学 IP 墓碑',
    desc: '邓布利多、林黛玉、小王子……5 位经典角色的故事墓碑，含墓志铭与生前遗物。',
  },
  {
    to: '/tribute/heritage',
    icon: Hammer,
    iconColor: 'text-candle',
    iconBg: 'bg-candle/10',
    borderColor: 'hover:border-candle/40',
    title: '非遗工艺墓碑',
    desc: '惠安石雕、青田石雕、徽州砖雕……5 种非遗工艺呈现的墓碑样式与工艺知识。',
  },
  {
    to: '/create',
    icon: Sparkles,
    iconColor: 'text-neon-magenta',
    iconBg: 'bg-neon-magenta/10',
    borderColor: 'hover:border-neon-magenta/40',
    title: '做我的墓碑',
    desc: '选模板 → 填碑文 → 拖拽 DIY → 导出长图或视频，30 秒带走属于你的纪念品。',
  },
]

const features = [
  { label: '零后端', desc: '纯前端部署', accent: 'text-jade' },
  { label: '零登录', desc: '无需注册', accent: 'text-neon-magenta' },
  { label: '零存储', desc: '关闭即丢', accent: 'text-neon-green' },
  { label: '零 AI', desc: '用户即兴创作', accent: 'text-candle' },
]

/** 花园装饰：左侧藤蔓 */
function GardenVineLeft() {
  return (
    <svg
      className="pointer-events-none absolute top-0 left-0 h-[60vh] w-24 text-jade/20 sm:w-32"
      viewBox="0 0 120 600"
      fill="none"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <path
        d="M60 0 C60 80, 20 120, 40 200 C60 280, 100 320, 70 400 C40 480, 10 520, 30 600"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="35" cy="130" r="6" fill="currentColor" />
      <circle cx="75" cy="260" r="5" fill="currentColor" />
      <circle cx="45" cy="420" r="7" fill="currentColor" />
      <circle cx="25" cy="540" r="5" fill="currentColor" />
    </svg>
  )
}

/** 花园装饰：右侧藤蔓 */
function GardenVineRight() {
  return (
    <svg
      className="pointer-events-none absolute top-20 right-0 h-[55vh] w-24 text-neon-magenta/16 sm:w-32"
      viewBox="0 0 120 600"
      fill="none"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <path
        d="M60 0 C60 100, 100 140, 70 220 C40 300, 0 340, 40 420 C80 500, 90 540, 60 600"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="85" cy="150" r="6" fill="currentColor" />
      <circle cx="35" cy="300" r="5" fill="currentColor" />
      <circle cx="70" cy="450" r="7" fill="currentColor" />
    </svg>
  )
}

/** 墓碑简笔画：花园里的一块石碑 */
function TombstoneInGarden() {
  return (
    <svg
      className="mx-auto h-32 w-32 text-stone-400/80 sm:h-40 sm:w-40"
      viewBox="0 0 160 180"
      fill="none"
      aria-hidden="true"
    >
      {/* 底座草地 */}
      <ellipse cx="80" cy="165" rx="70" ry="12" fill="var(--color-jade)" opacity="0.25" />
      {/* 碑身 */}
      <path
        d="M50 160 L50 60 C50 38 62 22 80 22 C98 22 110 38 110 60 L110 160"
        fill="var(--color-stone-200)"
        stroke="var(--color-stone-400)"
        strokeWidth="2.5"
      />
      {/* 碑文横线 */}
      <line x1="65" y1="75" x2="95" y2="75" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="90" x2="98" y2="90" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="105" x2="92" y2="105" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      {/* 小花 */}
      <circle cx="35" cy="155" r="4" fill="var(--color-neon-magenta)" opacity="0.7" />
      <circle cx="125" cy="158" r="3.5" fill="var(--color-candle)" opacity="0.7" />
      <circle cx="115" cy="148" r="3" fill="var(--color-jade)" opacity="0.6" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero 区 */}
      <section className="relative flex min-h-[84vh] flex-col items-center justify-center px-4 py-20 text-center">
        <GardenVineLeft />
        <GardenVineRight />

        {/* 背景光晕 */}
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-60" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[30vh] w-[30vh] rounded-full bg-neon-magenta/8 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-[20vh] w-[20vh] rounded-full bg-candle/10 blur-3xl" />

        <div className="relative z-10 animate-fade-in">
          {/* 标签 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-jade/30 bg-ink-card/60 px-4 py-1.5 shadow-tomb">
            <Flower2 className="h-3.5 w-3.5 text-jade" aria-hidden="true" />
            <span className="font-serif text-xs tracking-wider text-jade">
              一座从花园里长出来的墓碑
            </span>
          </div>

          {/* 墓碑插画 */}
          <div className="mb-6">
            <TombstoneInGarden />
          </div>

          {/* 主标题 */}
          <h1 className="mb-5 font-serif text-5xl font-medium leading-tight text-mist sm:text-6xl md:text-7xl">
            赛博墓园
          </h1>

          {/* 副标题 */}
          <div className="mx-auto mb-10 max-w-xl">
            <p className="font-serif text-lg leading-relaxed text-mist-soft sm:text-xl">
              给活着的人，做一块提前的
              <span className="text-jade">故事墓碑</span>
            </p>
          </div>

          {/* CTA 按钮 */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/tribute" className="btn-secondary w-full cursor-pointer sm:w-auto">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              逛墓园
            </Link>
            <Link to="/create" className="btn-primary group w-full cursor-pointer sm:w-auto">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
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
          <div className="flex flex-col items-center gap-2 text-xs font-serif tracking-wider">
            <span className="text-jade/70">向下滑动</span>
            <div className="h-8 w-px bg-gradient-to-b from-jade/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* 三栏入口 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 font-serif text-xs tracking-[0.2em] text-jade/70 uppercase">
            三种进入方式
          </p>
          <h2 className="font-serif text-2xl text-mist sm:text-3xl">花园小径</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {entryCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.to}
                to={card.to}
                className={`group garden-frame relative cursor-pointer overflow-hidden rounded-xl bg-ink-card/60 p-6 card-hover border border-ink-border ${card.borderColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink`}
              >
                <div className="relative z-10">
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} transition-transform duration-base group-hover:scale-105`}
                  >
                    <Icon className={`h-5 w-5 ${card.iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg text-mist">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-mist-soft">{card.desc}</p>
                  <div className={`mt-4 inline-flex items-center gap-1 text-xs font-serif ${card.iconColor} opacity-0 transition-opacity duration-base group-hover:opacity-100`}>
                    <span>进入 →</span>
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
        <div className="garden-frame relative overflow-hidden rounded-xl bg-ink-card/40 p-8 shadow-tomb sm:p-10">
          {/* 背景装饰 */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-jade/8 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-neon-magenta/6 blur-2xl" />

          <div className="relative text-center">
            <p className="mb-2 font-serif text-xs tracking-[0.2em] text-jade/70 uppercase">
              我们的约定
            </p>
            <h2 className="mb-2 font-serif text-2xl text-mist sm:text-3xl">纯工具型 · 即做即走</h2>
            <p className="mb-8 font-serif text-xs text-mist-dim">NO_BACKEND · NO_LOGIN · NO_STORAGE · NO_AI</p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {features.map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-xl border border-ink-border bg-ink-soft/50 p-4 transition-base hover:border-mist-muted hover:bg-ink-soft"
                >
                  <div className={`mb-1 font-serif text-sm ${item.accent}`}>{item.label}</div>
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

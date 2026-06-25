import { Link } from 'react-router-dom'
import { BookOpen, Hammer, Sparkles, ArrowRight, Flower2, Globe, Layers } from 'lucide-react'
import { TombstoneIllustration } from '@/components/tombstone/TombstoneIllustration'

const entryCards = [
  {
    to: '/tribute',
    icon: BookOpen,
    iconColor: 'text-jade',
    iconBg: 'bg-jade/10',
    borderColor: 'hover:border-jade/40',
    title: '文学 IP 墓碑',
    desc: '邓布利多、林黛玉、小王子……15 位经典角色的故事墓碑，含墓志铭与生前遗物。',
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
    to: '/forms',
    icon: Layers,
    iconColor: 'text-neon-cyan',
    iconBg: 'bg-neon-cyan/10',
    borderColor: 'hover:border-neon-cyan/40',
    title: '墓碑形式图鉴',
    desc: '全球 40+ 种墓碑形式，按地区、形状、风格、材质多维度筛选与探索。',
  },
  {
    to: '/culture',
    icon: Globe,
    iconColor: 'text-neon-magenta',
    iconBg: 'bg-neon-magenta/10',
    borderColor: 'hover:border-neon-magenta/40',
    title: '死亡文化图鉴',
    desc: '理解不同文明对死亡的态度——从中国的天人合一到墨西哥的亡灵节。',
  },
  {
    to: '/create',
    icon: Sparkles,
    iconColor: 'text-candle',
    iconBg: 'bg-candle/10',
    borderColor: 'hover:border-candle/40',
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

/** 首屏墓碑群：花园里错落生长的多块石碑 */
function TombstoneCluster() {
  return (
    <div className="relative mx-auto h-36 w-72 sm:h-44 sm:w-96" aria-hidden="true">
      {/* 草地 */}
      <div className="absolute bottom-2 left-1/2 h-4 w-[90%] -translate-x-1/2 rounded-[100%] bg-jade/15 blur-sm" />

      {/* 左侧：孙悟空柱碑 */}
      <div className="absolute bottom-0 left-2 h-28 w-20 sm:left-6 sm:h-36 sm:w-24">
        <TombstoneIllustration variant="wukong" className="h-full w-full" />
      </div>

      {/* 中间：林黛玉诗卷碑（最高） */}
      <div className="absolute bottom-0 left-1/2 z-10 h-36 w-24 -translate-x-1/2 sm:h-44 sm:w-28">
        <TombstoneIllustration variant="daiyu" className="h-full w-full" />
      </div>

      {/* 右侧：小王子小行星碑 */}
      <div className="absolute bottom-0 right-2 h-24 w-20 sm:right-6 sm:h-28 sm:w-24">
        <TombstoneIllustration variant="prince" className="h-full w-full" />
      </div>

      {/* 中后：邓布利多魔法塔碑 */}
      <div className="absolute bottom-0 left-[22%] z-0 h-28 w-16 opacity-80 sm:left-[26%] sm:h-32 sm:w-20">
        <TombstoneIllustration variant="dumbledore" className="h-full w-full" />
      </div>

      {/* 中后右：惠安石雕厚重碑 */}
      <div className="absolute bottom-0 right-[20%] z-0 h-28 w-16 opacity-80 sm:right-[24%] sm:h-32 sm:w-20">
        <TombstoneIllustration variant="huian-stone" className="h-full w-full" />
      </div>

      {/* 飘落花瓣装饰 */}
      <svg className="pointer-events-none absolute inset-0" viewBox="0 0 288 176" fill="none">
        <circle cx="40" cy="40" r="3" fill="var(--color-neon-magenta)" opacity="0.5" />
        <circle cx="250" cy="60" r="2.5" fill="var(--color-candle)" opacity="0.5" />
        <circle cx="220" cy="30" r="2" fill="var(--color-jade)" opacity="0.45" />
      </svg>
    </div>
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
            <TombstoneCluster />
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
            五种进入方式
          </p>
          <h2 className="font-serif text-2xl text-mist sm:text-3xl">花园小径</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

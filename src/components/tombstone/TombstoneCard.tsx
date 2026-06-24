/**
 * 墓碑展示卡片（致敬区 / 墓园展厅用）
 * 大图展示卡片，强调视觉预览与悬停交互
 */
import { ArrowUpRight } from 'lucide-react'
import { TombstoneIllustration } from './TombstoneIllustration'

interface TombstoneCardProps {
  title: string
  subtitle: string
  epitaph: string
  /** 主题色 token：candle | jade | blood | bronze | neon-cyan | neon-magenta */
  accent: string
  /** 墓碑造型变体 */
  variant?:
    | 'default'
    | 'dumbledore'
    | 'daiyu'
    | 'prince'
    | 'wukong'
    | 'quixote'
    | 'huian-stone'
    | 'huizhou-brick'
    | 'suzhou-stele'
    | 'miao-silver'
    | 'yi-lacquer'
  /** 分类标签，如 文学IP / 非遗工艺 */
  category?: string
  /** 额外徽章文字，如 5位角色 / 5种工艺 */
  badge?: string
}

/** 将主题 token 映射为具体色值 */
const ACCENT_MAP: Record<string, { hex: string; glow: string; text: string; soft: string }> = {
  candle: { hex: '#c9985d', glow: 'rgba(201,152,93,0.22)', text: 'text-candle', soft: 'bg-candle/10' },
  jade: { hex: '#6b8e6b', glow: 'rgba(107,142,107,0.22)', text: 'text-jade', soft: 'bg-jade/10' },
  blood: { hex: '#a65d6d', glow: 'rgba(166,93,109,0.22)', text: 'text-blood', soft: 'bg-blood/10' },
  bronze: { hex: '#9a7844', glow: 'rgba(154,120,68,0.22)', text: 'text-bronze', soft: 'bg-bronze/10' },
  'neon-cyan': { hex: '#6b9a8f', glow: 'rgba(107,154,143,0.22)', text: 'text-neon-cyan', soft: 'bg-neon-cyan/10' },
  'neon-magenta': { hex: '#b88aa3', glow: 'rgba(184,138,163,0.22)', text: 'text-neon-magenta', soft: 'bg-neon-magenta/10' },
}

export function TombstoneCard({ title, subtitle, epitaph, accent, variant, category, badge }: TombstoneCardProps) {
  const c = ACCENT_MAP[accent] ?? ACCENT_MAP.candle

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-card transition-all duration-500 ease-out-quart hover:-translate-y-1.5 hover:border-mist-muted hover:shadow-[0_24px_48px_-12px_rgba(61,58,53,0.12)]"
      style={{ ['--accent' as string]: c.hex }}
    >
      {/* 预览区 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
        {/* 花园背景 */}
        <div
          className="absolute inset-0 opacity-60 transition-transform duration-700 ease-out-quart group-hover:scale-105"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${c.glow}, transparent 35%), radial-gradient(circle at 20% 80%, rgba(138,184,138,0.08), transparent 30%), linear-gradient(180deg, #fffcf7 0%, #f0ece3 100%)`,
          }}
        />

        {/* 简化墓碑插画 */}
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <TombstoneIllustration variant={variant} className="h-[72%] w-auto transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]" />
        </div>

        {/* 顶部徽章 */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {category && (
            <span className="rounded-full border border-ink-border bg-ink-card/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-mist-soft backdrop-blur-sm">
              {category}
            </span>
          )}
          {badge && (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${c.soft} ${c.text}`}>
              {badge}
            </span>
          )}
        </div>

        {/* 悬停遮罩 */}
        <div className="absolute inset-0 flex items-center justify-center bg-mist/0 opacity-0 transition-all duration-500 ease-out-quart group-hover:bg-mist/5 group-hover:opacity-100">
          <div
            className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full border border-ink-border bg-ink-card/95 text-mist shadow-tomb transition-all duration-500 ease-out-quart group-hover:translate-y-0"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <h3 className="mb-1 font-serif text-lg font-medium tracking-wide text-mist transition-colors duration-300 group-hover:text-mist-soft">
            {title}
          </h3>
          <p className="text-xs font-medium tracking-wider text-mist-dim uppercase">{subtitle}</p>
        </div>

        <div className="mt-auto border-t border-ink-border pt-3">
          <p className="line-clamp-2 font-serif text-sm italic leading-relaxed text-mist-soft">
            “{epitaph}”
          </p>
        </div>
      </div>
    </article>
  )
}

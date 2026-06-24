/**
 * 墓碑卡片（致敬区列表用）
 */
import { ArrowRight } from 'lucide-react'

interface TombstoneCardProps {
  title: string
  subtitle: string
  epitaph: string
  /** 主题色 token：candle | jade | blood | bronze | neon-cyan | neon-magenta */
  accent: string
}

/** 将主题 token 映射为具体色值，避免向 inline style 传入无效颜色字符串 */
const ACCENT_MAP: Record<string, { hex: string; glow: string; text: string }> = {
  candle: { hex: '#f6c547', glow: 'rgba(246,197,71,0.18)', text: 'text-candle' },
  jade: { hex: '#4f8c60', glow: 'rgba(79,140,96,0.18)', text: 'text-jade' },
  blood: { hex: '#9b1c1c', glow: 'rgba(155,28,28,0.18)', text: 'text-blood' },
  bronze: { hex: '#9a7844', glow: 'rgba(154,120,68,0.18)', text: 'text-bronze' },
  'neon-cyan': { hex: '#00fff0', glow: 'rgba(0,255,240,0.18)', text: 'text-neon-cyan' },
  'neon-magenta': { hex: '#ff00ff', glow: 'rgba(255,0,255,0.18)', text: 'text-neon-magenta' },
}

export function TombstoneCard({ title, subtitle, epitaph, accent }: TombstoneCardProps) {
  const c = ACCENT_MAP[accent] ?? ACCENT_MAP.candle

  return (
    <div
      className="ts-card group relative cursor-pointer overflow-hidden rounded-md border bg-ink-card/50 p-5 transition-base hover:ts-card-hover"
      style={{
        ['--accent' as string]: c.hex,
        ['--accent-glow' as string]: c.glow,
        borderColor: 'var(--color-ink-border)',
      }}
    >
      {/* 顶部装饰线 */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-70 transition-opacity duration-base group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      {/* 标题区 */}
      <div className="mb-3 text-center">
        <h3 className="font-serif text-lg tracking-[0.2em] text-mist">{title}</h3>
        <p className="mt-1 text-xs text-mist-dim">{subtitle}</p>
      </div>

      {/* 简化墓碑造型 */}
      <div
        className="relative mx-auto my-4 flex h-28 w-24 flex-col items-center justify-center rounded-t-[48px] rounded-b-md border px-2 text-center transition-base group-hover:shadow-[0_0_24px_var(--accent-glow)]"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 55%, transparent)',
          background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, transparent), transparent 80%)',
        }}
      >
        {/* 顶部圆球 */}
        <div
          className="absolute -top-2 h-4 w-4 rounded-full border-2"
          style={{ borderColor: 'var(--accent)', background: 'var(--color-ink-card)' }}
        />
        <span className="line-clamp-3 font-serif text-[11px] leading-tight text-mist-soft">
          {epitaph}
        </span>
      </div>

      {/* 墓志铭引言 */}
      <p className="mt-2 line-clamp-2 text-center font-serif text-xs italic leading-relaxed text-mist-dim">
        “{epitaph}”
      </p>

      {/* 进入提示 */}
      <div className={`mt-3 flex items-center justify-center gap-1 text-xs font-mono ${c.text} opacity-0 transition-opacity duration-base group-hover:opacity-100`}>
        <span>&gt; ENTER</span>
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </div>
    </div>
  )
}

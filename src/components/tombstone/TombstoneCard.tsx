/**
 * 墓碑卡片（致敬区列表用）
 */
import { cn } from '@/lib/utils'

interface TombstoneCardProps {
  title: string
  subtitle: string
  epitaph: string
  accent: string
}

export function TombstoneCard({ title, subtitle, epitaph, accent }: TombstoneCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded border bg-ink-card/40 p-4 transition-all',
        'hover:border-candle/40 hover:shadow-candle'
      )}
      style={{ borderColor: `${accent}33` }}
    >
      {/* 顶部装饰线 */}
      <div
        className="absolute left-0 right-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className="mb-2 text-center">
        <h3 className="font-serif text-lg tracking-widest text-mist">{title}</h3>
        <p className="mt-0.5 text-xs text-mist-dim">{subtitle}</p>
      </div>

      {/* 简化墓碑造型 */}
      <div
        className="mx-auto my-3 flex h-24 w-20 flex-col items-center justify-center rounded-t-[40px] rounded-b-md border px-2 text-center"
        style={{
          borderColor: accent,
          background: `linear-gradient(180deg, ${accent}11, transparent)`,
        }}
      >
        <span className="font-serif text-[10px] leading-tight text-mist-soft line-clamp-3">
          {epitaph}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-center font-serif text-xs italic text-mist-dim">
        “{epitaph}”
      </p>
    </div>
  )
}

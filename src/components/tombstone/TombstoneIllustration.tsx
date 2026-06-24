/**
 * 花园中的简化墓碑插画（用于卡片预览）
 */
interface TombstoneIllustrationProps {
  className?: string
}

export function TombstoneIllustration({ className = 'h-[72%] w-auto' }: TombstoneIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 180"
      fill="none"
      aria-hidden="true"
    >
      {/* 草地 */}
      <ellipse cx="70" cy="168" rx="58" ry="8" fill="var(--color-jade)" opacity="0.2" />
      {/* 碑身 */}
      <path
        d="M42 165 L42 58 C42 38 54 24 70 24 C86 24 98 38 98 58 L98 165"
        fill="var(--color-stone-200)"
        stroke="var(--color-stone-400)"
        strokeWidth="2"
      />
      {/* 碑文 */}
      <line x1="58" y1="68" x2="82" y2="68" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="82" x2="85" y2="82" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="96" x2="80" y2="96" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      {/* 装饰小花 */}
      <circle cx="32" cy="160" r="4" fill="var(--color-neon-magenta)" opacity="0.65" />
      <circle cx="108" cy="162" r="3" fill="var(--color-candle)" opacity="0.65" />
      <circle cx="95" cy="150" r="2.5" fill="var(--color-jade)" opacity="0.55" />
    </svg>
  )
}

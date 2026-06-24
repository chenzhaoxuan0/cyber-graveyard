/**
 * 花园中的墓碑插画（用于卡片预览与装饰）
 * 支持多种与墓主/工艺相匹配的造型变体
 */
interface TombstoneIllustrationProps {
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
  className?: string
}

export function TombstoneIllustration({
  variant = 'default',
  className = 'h-[72%] w-auto',
}: TombstoneIllustrationProps) {
  switch (variant) {
    case 'dumbledore':
      return <DumbledoreTombstone className={className} />
    case 'daiyu':
      return <DaiyuTombstone className={className} />
    case 'prince':
      return <PrinceTombstone className={className} />
    case 'wukong':
      return <WukongTombstone className={className} />
    case 'quixote':
      return <QuixoteTombstone className={className} />
    case 'huian-stone':
      return <HuianStoneTombstone className={className} />
    case 'huizhou-brick':
      return <HuizhouBrickTombstone className={className} />
    case 'suzhou-stele':
      return <SuzhouSteleTombstone className={className} />
    case 'miao-silver':
      return <MiaoSilverTombstone className={className} />
    case 'yi-lacquer':
      return <YiLacquerTombstone className={className} />
    default:
      return <DefaultTombstone className={className} />
  }
}

/* ===================== 通用底座与小花 ===================== */
function GardenBase() {
  return (
    <g>
      <ellipse cx="70" cy="168" rx="58" ry="8" fill="var(--color-jade)" opacity="0.2" />
      <circle cx="32" cy="160" r="4" fill="var(--color-neon-magenta)" opacity="0.65" />
      <circle cx="108" cy="162" r="3" fill="var(--color-candle)" opacity="0.65" />
      <circle cx="95" cy="150" r="2.5" fill="var(--color-jade)" opacity="0.55" />
    </g>
  )
}

/* ===================== 默认：圆润石碑 ===================== */
function DefaultTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      <path
        d="M42 165 L42 58 C42 38 54 24 70 24 C86 24 98 38 98 58 L98 165"
        fill="var(--color-stone-200)"
        stroke="var(--color-stone-400)"
        strokeWidth="2"
      />
      <line x1="58" y1="68" x2="82" y2="68" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="82" x2="85" y2="82" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="96" x2="80" y2="96" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 邓布利多：魔法高塔碑，带星月 ===================== */
function DumbledoreTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 高瘦碑身 */}
      <path
        d="M48 165 L48 55 C48 34 58 20 70 18 C82 20 92 34 92 55 L92 165"
        fill="var(--color-stone-200)"
        stroke="var(--color-stone-400)"
        strokeWidth="2"
      />
      {/* 顶部尖拱装饰 */}
      <path d="M70 18 L70 8" stroke="var(--color-candle)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="70" cy="5" r="3" fill="var(--color-candle)" opacity="0.8" />
      {/* 星月 */}
      <circle cx="60" cy="45" r="3" fill="var(--color-candle)" opacity="0.7" />
      <path d="M78 42 C82 42 84 45 84 48 C84 51 80 53 78 53 C80 50 80 47 78 42Z" fill="var(--color-candle)" opacity="0.7" />
      {/* 碑文 */}
      <line x1="58" y1="72" x2="82" y2="72" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="86" x2="85" y2="86" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="100" x2="80" y2="100" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 林黛玉：柳叶/诗卷形碑 ===================== */
function DaiyuTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 柔和曲线碑身 */}
      <path
        d="M45 165 L45 70 C45 45 55 26 70 22 C85 26 95 45 95 70 L95 165"
        fill="var(--color-stone-200)"
        stroke="var(--color-stone-400)"
        strokeWidth="2"
      />
      {/* 飘落的花瓣 */}
      <path d="M38 60 Q42 55 46 60 Q42 65 38 60" fill="var(--color-neon-magenta)" opacity="0.6" />
      <path d="M100 80 Q104 75 108 80 Q104 85 100 80" fill="var(--color-neon-magenta)" opacity="0.5" />
      {/* 碑文 */}
      <line x1="58" y1="70" x2="82" y2="70" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="84" x2="85" y2="84" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="98" x2="80" y2="98" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 小王子：B612 小行星碑，带玫瑰 ===================== */
function PrinceTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 小巧圆润碑身 */}
      <path
        d="M50 165 L50 70 C50 50 58 36 70 32 C82 36 90 50 90 70 L90 165"
        fill="var(--color-stone-200)"
        stroke="var(--color-stone-400)"
        strokeWidth="2"
      />
      {/* 围巾 / 星球环 */}
      <path d="M48 75 Q70 90 92 75" stroke="var(--color-candle)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {/* 玫瑰 */}
      <path d="M115 155 Q118 145 115 140 Q112 145 115 155" fill="var(--color-blood)" opacity="0.7" />
      <line x1="115" y1="155" x2="115" y2="165" stroke="var(--color-jade)" strokeWidth="1.5" />
      {/* 碑文 */}
      <line x1="60" y1="72" x2="80" y2="72" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="86" x2="82" y2="86" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 孙悟空：云纹柱碑 ===================== */
function WukongTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 方正规整的柱形碑 */}
      <rect x="42" y="28" width="56" height="137" rx="4" fill="var(--color-stone-200)" stroke="var(--color-stone-400)" strokeWidth="2" />
      {/* 顶部云纹 */}
      <path d="M42 28 Q52 18 62 28 Q72 18 82 28 Q92 18 98 28" fill="none" stroke="var(--color-bronze)" strokeWidth="2.5" opacity="0.8" />
      {/* 金箍棒装饰 */}
      <rect x="66" y="40" width="8" height="90" rx="1" fill="var(--color-bronze)" opacity="0.25" />
      <line x1="66" y1="40" x2="74" y2="40" stroke="var(--color-bronze)" strokeWidth="2" />
      <line x1="66" y1="130" x2="74" y2="130" stroke="var(--color-bronze)" strokeWidth="2" />
      {/* 碑文 */}
      <line x1="52" y1="70" x2="62" y2="70" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="84" x2="62" y2="84" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 堂吉诃德：骑士盾形碑，带长矛 ===================== */
function QuixoteTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 盾形碑身 */}
      <path
        d="M40 165 L40 75 C40 45 55 28 70 24 C85 28 100 45 100 75 L100 165"
        fill="var(--color-stone-200)"
        stroke="var(--color-stone-400)"
        strokeWidth="2"
      />
      {/* 长矛 */}
      <line x1="105" y1="20" x2="105" y2="165" stroke="var(--color-blood)" strokeWidth="2" opacity="0.6" />
      <path d="M100 25 L110 25 L105 15 Z" fill="var(--color-blood)" opacity="0.6" />
      {/* 十字/剑装饰 */}
      <line x1="62" y1="55" x2="78" y2="55" stroke="var(--color-blood)" strokeWidth="2" opacity="0.5" />
      <line x1="70" y1="47" x2="70" y2="63" stroke="var(--color-blood)" strokeWidth="2" opacity="0.5" />
      {/* 碑文 */}
      <line x1="56" y1="78" x2="84" y2="78" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
      <line x1="54" y1="92" x2="86" y2="92" stroke="var(--color-stone-400)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 惠安石雕：厚重青石，浮雕边框 ===================== */
function HuianStoneTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 厚重碑身 */}
      <path
        d="M38 165 L38 60 C38 38 52 22 70 22 C88 22 102 38 102 60 L102 165"
        fill="var(--color-stone-300)"
        stroke="var(--color-stone-500)"
        strokeWidth="2.5"
      />
      {/* 浮雕边框 */}
      <path
        d="M46 60 C46 44 56 32 70 30 C84 32 94 44 94 60 L94 155 L46 155 Z"
        fill="none"
        stroke="var(--color-stone-500)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* 碑文 */}
      <line x1="58" y1="68" x2="82" y2="68" stroke="var(--color-stone-500)" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="82" x2="85" y2="82" stroke="var(--color-stone-500)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 徽州砖雕：青砖纹理，门楼造型 ===================== */
function HuizhouBrickTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 门楼形碑身 */}
      <path
        d="M35 165 L35 75 L50 55 L70 45 L90 55 L105 75 L105 165"
        fill="var(--color-stone-300)"
        stroke="var(--color-stone-500)"
        strokeWidth="2"
      />
      {/* 砖缝纹理 */}
      <line x1="45" y1="90" x2="95" y2="90" stroke="var(--color-stone-500)" strokeWidth="1" opacity="0.4" />
      <line x1="45" y1="110" x2="95" y2="110" stroke="var(--color-stone-500)" strokeWidth="1" opacity="0.4" />
      <line x1="45" y1="130" x2="95" y2="130" stroke="var(--color-stone-500)" strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="75" x2="70" y2="150" stroke="var(--color-stone-500)" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

/* ===================== 苏州碑刻：瘦长石碑，碑额装饰 ===================== */
function SuzhouSteleTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 高瘦碑身 */}
      <rect x="48" y="35" width="44" height="130" rx="2" fill="var(--color-stone-300)" stroke="var(--color-stone-500)" strokeWidth="2" />
      {/* 碑额 */}
      <path d="M48 35 Q70 20 92 35" fill="var(--color-stone-400)" opacity="0.3" />
      {/* 碑文列 */}
      <line x1="58" y1="55" x2="58" y2="145" stroke="var(--color-stone-500)" strokeWidth="1" opacity="0.4" />
      <line x1="70" y1="55" x2="70" y2="145" stroke="var(--color-stone-500)" strokeWidth="1" opacity="0.4" />
      <line x1="82" y1="55" x2="82" y2="145" stroke="var(--color-stone-500)" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

/* ===================== 苗族银饰：银冠弧形碑，蝴蝶纹样 ===================== */
function MiaoSilverTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 银冠弧形碑 */}
      <path
        d="M40 165 L40 85 C40 55 55 35 70 30 C85 35 100 55 100 85 L100 165"
        fill="var(--color-stone-300)"
        stroke="var(--color-stone-500)"
        strokeWidth="2"
      />
      {/* 顶部银饰冠状 */}
      <path d="M50 45 Q70 25 90 45" fill="none" stroke="var(--color-stone-500)" strokeWidth="2" opacity="0.6" />
      <circle cx="70" cy="38" r="4" fill="var(--color-stone-500)" opacity="0.3" />
      {/* 蝴蝶纹样 */}
      <path d="M62 75 Q58 68 62 62 Q66 68 62 75" fill="var(--color-stone-500)" opacity="0.4" />
      <path d="M78 75 Q74 68 78 62 Q82 68 78 75" fill="var(--color-stone-500)" opacity="0.4" />
      <line x1="58" y1="95" x2="82" y2="95" stroke="var(--color-stone-500)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    </svg>
  )
}

/* ===================== 彝族漆器：黑红黄三色，几何纹样 ===================== */
function YiLacquerTombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <GardenBase />
      {/* 碑身 */}
      <path
        d="M42 165 L42 60 C42 40 54 26 70 24 C86 26 98 40 98 60 L98 165"
        fill="var(--color-stone-300)"
        stroke="var(--color-stone-500)"
        strokeWidth="2"
      />
      {/* 红黑条纹装饰 */}
      <rect x="46" y="65" width="48" height="8" rx="1" fill="#9b4a4a" opacity="0.7" />
      <rect x="46" y="79" width="48" height="4" rx="1" fill="#3d3a35" opacity="0.8" />
      <rect x="46" y="89" width="48" height="8" rx="1" fill="#c9985d" opacity="0.7" />
      {/* 螺旋纹样 */}
      <path d="M64 115 Q70 108 76 115 Q70 122 64 115" fill="none" stroke="#9b4a4a" strokeWidth="2" opacity="0.6" />
    </svg>
  )
}

import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Globe, Tag, Palette, Info, BookOpen, Eye, MapPin } from 'lucide-react'
import { TOMBSTONE_FORMS } from '@/data/tombstone-forms'
import { CULTURAL_CONTENTS } from '@/data/cultural-content'
import type { FormPlacement, FormShape, FormMaterial, FormCulture, FormStyle, FormPeriod, FormRegion, FormReligion } from '@/types'

const PLACEMENT_LABELS: Record<FormPlacement, string> = {
  upright: '竖碑',
  flat: '平碑',
  slant: '斜面碑',
  bevel: '斜角碑',
  ledger: '平板碑',
  kerbed: '边框碑',
}

const SHAPE_LABELS: Record<FormShape, string> = {
  'rectangular': '矩形',
  'rounded-arch': '弧形顶',
  'ogee': '尖拱顶',
  'obelisk': '方尖碑',
  'obelisk-truncated': '截顶方尖碑',
  'broken-column': '断裂柱',
  'column': '柱形',
  'gateway': '门形',
  'cross-latin': '拉丁十字',
  'cross-celtic': '凯尔特十字',
  'cross-greek': '希腊十字',
  'cross-maltese': '马耳他十字',
  'tree-stump': '树桩形',
  'tree': '树形',
  'heart': '心形',
  'book': '书本形',
  'chest-tomb': '箱式',
  'table-tomb': '桌形',
  'boulder': '天然石形',
  'stele': '方柱形',
  'pagoda': '塔形',
  'gorinto': '五轮塔',
  'stupa': '佛塔',
  'dolmen': '石棚',
  'menhir': '立石',
  'custom-sculptural': '定制雕塑',
  'architectural': '建筑形',
}

const MATERIAL_LABELS: Record<FormMaterial, string> = {
  granite: '花岗岩',
  marble: '大理石',
  limestone: '石灰石',
  sandstone: '砂岩',
  slate: '板岩',
  bronze: '青铜',
  'cast-iron': '铸铁',
  zinc: '锌',
  wood: '木材',
  concrete: '混凝土',
  coral: '珊瑚石',
}

const CULTURE_LABELS: Record<FormCulture, string> = {
  chinese: '中国',
  japanese: '日本',
  korean: '韩国',
  vietnamese: '越南',
  filipino: '菲律宾',
  thai: '泰国',
  indonesian: '印尼',
  indian: '印度',
  turkish: '土耳其',
  british: '英国',
  french: '法国',
  italian: '意大利',
  german: '德国',
  russian: '俄罗斯',
  spanish: '西班牙',
  nordic: '北欧',
  american: '美国',
  mexican: '墨西哥',
  argentine: '阿根廷',
  african: '非洲',
  islamic: '伊斯兰',
  christian: '基督教',
  jewish: '犹太',
  buddhist: '佛教',
  modern: '现代',
}

const STYLE_LABELS: Record<FormStyle, string> = {
  traditional: '传统',
  gothic: '哥特式',
  neoclassical: '新古典',
  'art-deco': '装饰艺术',
  'art-nouveau': '新艺术',
  'egyptian-revival': '埃及复兴',
  minimalist: '极简',
  rustic: '乡村',
  'eco-nature': '自然生态',
  cyberpunk: '赛博朋克',
  steampunk: '蒸汽朋克',
  baroque: '巴洛克',
}

const PERIOD_LABELS: Record<FormPeriod, string> = {
  ancient: '古代',
  classical: '古典时代',
  medieval: '中世纪',
  renaissance: '文艺复兴',
  '18th-century': '18世纪',
  victorian: '维多利亚',
  edwardian: '爱德华时代',
  '20th-century': '20世纪',
  modern: '现代',
  contemporary: '当代',
}

const REGION_LABELS: Record<FormRegion, string> = {
  'east-asia': '东亚',
  'southeast-asia': '东南亚',
  'south-asia': '南亚',
  'middle-east': '中东',
  'europe-west': '西欧',
  'europe-east': '东欧',
  'europe-north': '北欧',
  'europe-south': '南欧',
  'north-america': '北美',
  'latin-america': '拉丁美洲',
  africa: '非洲',
  oceania: '大洋洲',
}

const RELIGION_LABELS: Record<FormReligion, string> = {
  'christian-catholic': '天主教',
  'christian-protestant': '基督教新教',
  'christian-orthodox': '东正教',
  jewish: '犹太教',
  islamic: '伊斯兰教',
  buddhist: '佛教',
  hindu: '印度教',
  sikh: '锡克教',
  secular: '世俗',
}

function TombstoneShapeSvg({ shape, palette }: { shape: FormShape; palette: { bg: string; fg: string; accent: string; border: string } }) {
  const w = 160
  const h = 200
  const baseW = 100
  const baseH = 20
  const baseX = (w - baseW) / 2
  const baseY = h - baseH

  const stoneW = 80
  const stoneH = 150
  const stoneX = (w - stoneW) / 2
  const stoneY = baseY - stoneH

  const renderTop = () => {
    switch (shape) {
      case 'rounded-arch':
        return <path d={`M ${stoneX} ${stoneY + 30} L ${stoneX} ${stoneY + stoneH} L ${stoneX + stoneW} ${stoneY + stoneH} L ${stoneX + stoneW} ${stoneY + 30} A 40 40 0 0 0 ${stoneX} ${stoneY + 30}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
      case 'ogee':
        return <path d={`M ${stoneX} ${stoneY + 25} L ${stoneX} ${stoneY + stoneH} L ${stoneX + stoneW} ${stoneY + stoneH} L ${stoneX + stoneW} ${stoneY + 25} Q ${stoneX + stoneW} ${stoneY - 10} ${stoneX + stoneW / 2} ${stoneY - 10} Q ${stoneX} ${stoneY - 10} ${stoneX} ${stoneY + 25}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
      case 'heart':
        return <path d={`M ${stoneX + stoneW / 2} ${stoneY + stoneH} L ${stoneX + stoneW / 2} ${stoneY + 20} C ${stoneX + stoneW / 2} ${stoneY - 10} ${stoneX} ${stoneY + 10} ${stoneX} ${stoneY + 30} C ${stoneX} ${stoneY + 50} ${stoneX + stoneW / 2} ${stoneY + 50} ${stoneX + stoneW / 2} ${stoneY + 20} C ${stoneX + stoneW / 2} ${stoneY + 50} ${stoneX + stoneW} ${stoneY + 50} ${stoneX + stoneW} ${stoneY + 30} C ${stoneX + stoneW} ${stoneY + 10} ${stoneX + stoneW / 2} ${stoneY - 10} ${stoneX + stoneW / 2} ${stoneY + 20}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
      case 'cross-latin':
      case 'cross-celtic':
      case 'cross-greek':
      case 'cross-maltese':
        return (
          <>
            <rect x={stoneX + stoneW / 2 - 10} y={stoneY} width={20} height={stoneH * 0.6} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <rect x={stoneX} y={stoneY + 20} width={stoneW} height={20} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <rect x={stoneX + stoneW / 2 - 10} y={stoneY + stoneH * 0.6} width={20} height={stoneH * 0.4} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
          </>
        )
      case 'broken-column':
        return (
          <>
            <rect x={stoneX + 10} y={stoneY + 40} width={stoneW - 20} height={stoneH - 40} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <path d={`M ${stoneX + 10} ${stoneY + 40} L ${stoneX} ${stoneY + 20} L ${stoneX + 15} ${stoneY + 10} L ${stoneX + stoneW - 10} ${stoneY + 40}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
          </>
        )
      case 'obelisk':
      case 'obelisk-truncated':
        return <path d={`M ${stoneX + stoneW / 2} ${stoneY} L ${stoneX + stoneW} ${stoneY + stoneH} L ${stoneX} ${stoneY + stoneH} Z`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
      case 'tree-stump':
        return (
          <>
            <path d={`M ${stoneX + 5} ${stoneY + stoneH} L ${stoneX + 5} ${stoneY + 20} Q ${stoneX + 5} ${stoneY - 10} ${stoneX + stoneW / 2} ${stoneY - 15} Q ${stoneX + stoneW - 5} ${stoneY - 10} ${stoneX + stoneW - 5} ${stoneY + 20} L ${stoneX + stoneW - 5} ${stoneY + stoneH}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <circle cx={stoneX + stoneW / 2} cy={stoneY + 30} r={15} fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.5" />
            <circle cx={stoneX + stoneW / 2} cy={stoneY + 30} r={22} fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.3" />
          </>
        )
      case 'book':
        return (
          <>
            <path d={`M ${stoneX + stoneW / 2} ${stoneY + 20} L ${stoneX + stoneW / 2} ${stoneY + stoneH} L ${stoneX} ${stoneY + stoneH} L ${stoneX} ${stoneY + 20} Q ${stoneX + stoneW / 2} ${stoneY + 10} ${stoneX + stoneW / 2} ${stoneY + 20}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <path d={`M ${stoneX + stoneW / 2} ${stoneY + 20} L ${stoneX + stoneW / 2} ${stoneY + stoneH} L ${stoneX + stoneW} ${stoneY + stoneH} L ${stoneX + stoneW} ${stoneY + 20} Q ${stoneX + stoneW / 2} ${stoneY + 10} ${stoneX + stoneW / 2} ${stoneY + 20}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
          </>
        )
      case 'stupa':
        return (
          <>
            <rect x={stoneX + 10} y={stoneY + 60} width={stoneW - 20} height={stoneH - 60} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <path d={`M ${stoneX + 10} ${stoneY + 60} L ${stoneX + stoneW / 2} ${stoneY + 20} L ${stoneX + stoneW - 10} ${stoneY + 60}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <path d={`M ${stoneX + stoneW / 2 - 8} ${stoneY + 20} L ${stoneX + stoneW / 2} ${stoneY} L ${stoneX + stoneW / 2 + 8} ${stoneY + 20}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
          </>
        )
      case 'gorinto':
        return (
          <>
            <rect x={stoneX + 15} y={stoneY + stoneH * 0.7} width={stoneW - 30} height={stoneH * 0.3} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <circle cx={stoneX + stoneW / 2} cy={stoneY + stoneH * 0.55} r={stoneW * 0.2} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <path d={`M ${stoneX + stoneW / 2 - 10} ${stoneY + stoneH * 0.55 - stoneW * 0.2} L ${stoneX + stoneW / 2} ${stoneY + stoneH * 0.25} L ${stoneX + stoneW / 2 + 10} ${stoneY + stoneH * 0.55 - stoneW * 0.2}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <path d={`M ${stoneX + stoneW / 2 - 6} ${stoneY + stoneH * 0.25} Q ${stoneX + stoneW / 2} ${stoneY + stoneH * 0.15} ${stoneX + stoneW / 2 + 6} ${stoneY + stoneH * 0.25}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <circle cx={stoneX + stoneW / 2} cy={stoneY + stoneH * 0.1} r={5} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
          </>
        )
      case 'chest-tomb':
        return (
          <>
            <rect x={stoneX - 5} y={stoneY + 30} width={stoneW + 10} height={stoneH - 30} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <rect x={stoneX - 5} y={stoneY + 30} width={stoneW + 10} height={15} fill={palette.accent} opacity="0.3" />
          </>
        )
      case 'architectural':
        return (
          <>
            <rect x={stoneX + 5} y={stoneY + 40} width={stoneW - 10} height={stoneH - 40} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <path d={`M ${stoneX} ${stoneY + 40} L ${stoneX + stoneW / 2} ${stoneY} L ${stoneX + stoneW} ${stoneY + 40}`} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <rect x={stoneX + stoneW / 2 - 10} y={stoneY + 50} width={20} height={30} fill={palette.accent} opacity="0.3" stroke={palette.border} strokeWidth="1" />
          </>
        )
      case 'column':
        return (
          <>
            <rect x={stoneX + 15} y={stoneY + 20} width={stoneW - 30} height={stoneH - 20} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <rect x={stoneX + 10} y={stoneY + 10} width={stoneW - 20} height={15} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
            <rect x={stoneX + 10} y={stoneY + stoneH - 10} width={stoneW - 20} height={15} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
          </>
        )
      case 'boulder':
        return <ellipse cx={stoneX + stoneW / 2} cy={stoneY + stoneH / 2 + 5} rx={stoneW / 2 + 5} ry={stoneH / 2} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
      case 'stele':
        return <rect x={stoneX + 10} y={stoneY + 10} width={stoneW - 20} height={stoneH - 10} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
      default:
        return <rect x={stoneX} y={stoneY} width={stoneW} height={stoneH} fill={palette.bg} stroke={palette.border} strokeWidth="2" />
    }
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto block h-48 w-auto" aria-hidden="true">
      <rect x={baseX - 10} y={baseY} width={baseW + 20} height={baseH + 5} fill={palette.border} opacity="0.3" rx="2" />
      <rect x={baseX} y={baseY} width={baseW} height={baseH} fill={palette.border} opacity="0.5" rx="2" />
      {renderTop()}
    </svg>
  )
}

export default function FormDetailPage() {
  const { id } = useParams<{ id: string }>()
  const form = TOMBSTONE_FORMS.find((f) => f.id === id)

  if (!form) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="mb-4 font-serif text-2xl text-blood">墓碑未找到</p>
        <Link to="/forms" className="cursor-pointer text-sm text-candle hover:underline">
          ← 返回形式目录
        </Link>
      </div>
    )
  }

  const relatedCultures = CULTURAL_CONTENTS.filter((c) => c.relatedFormIds.includes(form.id))

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 顶部导航 */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/forms"
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium tracking-wider text-mist-dim uppercase transition-colors hover:text-mist"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          返回形式目录
        </Link>
        <h1 className="font-serif text-lg tracking-[0.2em] text-candle">墓 碑 形 式</h1>
        <span className="w-16" />
      </div>

      {/* 标题区域 */}
      <header className="mb-8 text-center">
        <h2 className="mb-2 font-serif text-3xl font-medium tracking-tight text-mist sm:text-4xl">
          {form.name}
        </h2>
        <p className="font-serif text-base text-mist-soft">{form.nameEn}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 左侧：视觉预览 */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-border bg-ink-card/40 p-8 shadow-tomb">
          <div
            className="relative mb-6 flex w-full items-center justify-center rounded-xl p-8"
            style={{ background: `linear-gradient(135deg, ${form.palette.bg} 0%, ${form.palette.bg}88 50%, ${form.palette.accent}22 100%)` }}
          >
            <TombstoneShapeSvg shape={form.shape} palette={form.palette} />
          </div>
          {/* 色板指示 */}
          <div className="flex items-center gap-2">
            {[form.palette.bg, form.palette.fg, form.palette.accent, form.palette.border].map((c, i) => (
              <div
                key={i}
                className="h-6 w-6 rounded-full border border-ink-border shadow-sm"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
            <span className="ml-1 text-xs text-mist-dim">色板</span>
          </div>
        </div>

        {/* 右侧：信息区 */}
        <div className="space-y-5">
          {/* 描述 */}
          <div className="rounded-xl border border-ink-border bg-ink-card/40 p-5 shadow-tomb">
            <div className="mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-candle" aria-hidden="true" />
              <h3 className="font-serif text-sm text-mist">简介</h3>
            </div>
            <p className="text-sm leading-relaxed text-mist-soft">{form.description}</p>
          </div>

          {/* 信息网格 */}
          <div className="rounded-xl border border-ink-border bg-ink-card/40 p-5 shadow-tomb">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-candle" aria-hidden="true" />
              <h3 className="font-serif text-sm text-mist">详细信息</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3">
                <p className="mb-1 text-xs font-medium text-mist-dim">起源/发源地</p>
                <p className="flex items-center gap-1.5 text-sm text-mist-soft">
                  <MapPin className="h-3 w-3 text-jade" aria-hidden="true" />
                  {form.origin}
                </p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3">
                <p className="mb-1 text-xs font-medium text-mist-dim">流行时期</p>
                <p className="text-sm text-mist-soft">{form.era}</p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3 sm:col-span-2">
                <p className="mb-1 text-xs font-medium text-mist-dim">象征意义</p>
                <p className="text-sm text-mist-soft">{form.symbolism}</p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3">
                <p className="mb-1 text-xs font-medium text-mist-dim">摆放形态</p>
                <p className="text-sm text-mist-soft">{PLACEMENT_LABELS[form.placement]}</p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3">
                <p className="mb-1 text-xs font-medium text-mist-dim">形状</p>
                <p className="text-sm text-mist-soft">{SHAPE_LABELS[form.shape]}</p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3">
                <p className="mb-1 text-xs font-medium text-mist-dim">材质</p>
                <div className="flex flex-wrap gap-1">
                  {form.material.map((m) => (
                    <span key={m} className="rounded-full border border-ink-border bg-ink-card px-2 py-0.5 text-xs text-mist-soft">
                      {MATERIAL_LABELS[m]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3">
                <p className="mb-1 text-xs font-medium text-mist-dim">视觉元素</p>
                <div className="flex flex-wrap gap-1">
                  {form.visualElements.map((v) => (
                    <span key={v} className="rounded-full border border-candle/30 bg-candle/8 px-2 py-0.5 text-xs text-candle-soft">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-soft/50 p-3 sm:col-span-2">
                <p className="mb-1 text-xs font-medium text-mist-dim">适用场景</p>
                <div className="flex flex-wrap gap-1">
                  {form.suitableFor.map((s) => (
                    <span key={s} className="rounded-full border border-jade/30 bg-jade/8 px-2 py-0.5 text-xs text-jade-soft">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 标签区域 */}
      <section className="mt-8 rounded-2xl border border-ink-border bg-ink-card/40 p-6 shadow-tomb">
        <div className="mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4 text-candle" aria-hidden="true" />
          <h3 className="font-serif text-sm text-mist">标签</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.culture.map((c) => (
            <span key={`culture-${c}`} className="rounded-full border border-jade/30 bg-jade/8 px-3 py-1 text-xs font-medium text-jade">
              <Globe className="mr-1 inline h-3 w-3" aria-hidden="true" />
              {CULTURE_LABELS[c]}
            </span>
          ))}
          {form.style.map((s) => (
            <span key={`style-${s}`} className="rounded-full border border-neon-magenta/30 bg-neon-magenta/8 px-3 py-1 text-xs font-medium text-neon-magenta">
              <Palette className="mr-1 inline h-3 w-3" aria-hidden="true" />
              {STYLE_LABELS[s]}
            </span>
          ))}
          {form.period && (
            <span className="rounded-full border border-candle/30 bg-candle/8 px-3 py-1 text-xs font-medium text-candle-soft">
              {PERIOD_LABELS[form.period]}
            </span>
          )}
          {form.region && (
            <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/8 px-3 py-1 text-xs font-medium text-neon-cyan">
              {REGION_LABELS[form.region]}
            </span>
          )}
          {form.religion.map((r) => (
            <span key={`religion-${r}`} className="rounded-full border border-blood/30 bg-blood/8 px-3 py-1 text-xs font-medium text-blood">
              {RELIGION_LABELS[r]}
            </span>
          ))}
        </div>
      </section>

      {/* 文化语境 */}
      {relatedCultures.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Eye className="h-4 w-4 text-candle" aria-hidden="true" />
            <h3 className="font-serif text-lg text-mist">文化语境</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {relatedCultures.map((culture) => (
              <div
                key={culture.id}
                className="rounded-2xl border border-ink-border bg-ink-card/40 p-5 shadow-tomb transition-base hover:-translate-y-1 hover:border-mist-muted hover:shadow-tomb-lg"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-jade" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wider text-jade uppercase">{culture.regionLabel}</span>
                  <span className="font-serif text-sm text-mist">{culture.title}</span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-mist-soft">{culture.philosophy}</p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {culture.keyConcepts.map((kc) => (
                    <span key={kc} className="rounded-full border border-candle/30 bg-candle/8 px-2 py-0.5 text-xs text-candle-soft">
                      {kc}
                    </span>
                  ))}
                </div>
                <div className="mb-4 space-y-1">
                  <p className="text-xs font-medium text-mist-dim">文化趣闻</p>
                  <ul className="list-inside list-disc space-y-0.5 text-xs leading-relaxed text-mist-soft">
                    {culture.funFacts.map((ff, i) => (
                      <li key={i}>{ff}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/culture/${culture.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-candle transition-colors hover:text-candle-soft"
                >
                  查看文化详情
                  <ArrowLeft className="h-3 w-3 rotate-180" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 底部：使用此形式创作 */}
      <div className="mt-10 text-center">
        <Link
          to="/create"
          className="btn-primary cursor-pointer"
        >
          使用此形式创作
          <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
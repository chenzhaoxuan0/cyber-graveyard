import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Filter, Globe, Tag, X, ArrowUpRight } from 'lucide-react'
import { TOMBSTONE_FORMS } from '@/data/tombstone-forms'
import type {
  FormPlacement,
  FormShape,
  FormRegion,
  FormMaterial,
  FormStyle,
} from '@/types'

// ===== 筛选维度标签映射 =====

type FilterDimension = 'region' | 'placement' | 'shape' | 'style' | 'material'

interface FilterOption {
  key: string
  label: string
}

interface FilterGroup {
  dimension: FilterDimension
  label: string
  icon: React.ReactNode
  options: FilterOption[]
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
  'latin-america': '拉美',
  africa: '非洲',
  oceania: '大洋洲',
}

const PLACEMENT_LABELS: Record<FormPlacement, string> = {
  upright: '竖碑',
  flat: '平碑',
  slant: '斜面碑',
  bevel: '坡面碑',
  ledger: '躺碑',
  kerbed: '全覆碑',
}

const SHAPE_LABEL_MAP: Record<FormShape, string> = {
  rectangular: '矩形',
  'rounded-arch': '圆拱顶',
  ogee: '圆拱顶',
  obelisk: '方尖碑',
  'obelisk-truncated': '方尖碑',
  'broken-column': '断柱',
  column: '方尖碑',
  gateway: '定制',
  'cross-latin': '十字形',
  'cross-celtic': '十字形',
  'cross-greek': '十字形',
  'cross-maltese': '十字形',
  'tree-stump': '树桩',
  tree: '树桩',
  heart: '心形',
  book: '书本',
  'chest-tomb': '定制',
  'table-tomb': '定制',
  boulder: '定制',
  stele: '矩形',
  pagoda: '佛塔',
  gorinto: '佛塔',
  stupa: '佛塔',
  dolmen: '定制',
  menhir: '定制',
  'custom-sculptural': '定制',
  architectural: '定制',
}

const STYLE_LABEL_MAP: Record<FormStyle, string> = {
  traditional: '传统',
  gothic: '哥特',
  neoclassical: '传统',
  'art-deco': '传统',
  'art-nouveau': '传统',
  'egyptian-revival': '传统',
  minimalist: '极简',
  rustic: '自然',
  'eco-nature': '自然',
  cyberpunk: '赛博朋克',
  steampunk: '赛博朋克',
  baroque: '巴洛克',
}

const MATERIAL_LABEL_MAP: Record<FormMaterial, string> = {
  granite: '花岗岩',
  marble: '大理石',
  limestone: '大理石',
  sandstone: '花岗岩',
  slate: '花岗岩',
  bronze: '青铜',
  'cast-iron': '青铜',
  zinc: '青铜',
  wood: '木材',
  concrete: '花岗岩',
  coral: '珊瑚',
}

// 构建筛选选项列表
function buildFilterOptions(): FilterGroup[] {
  const regionSet = new Set<FormRegion>()
  const placementSet = new Set<FormPlacement>()
  const shapeSet = new Set<string>()
  const styleSet = new Set<string>()
  const materialSet = new Set<string>()

  for (const form of TOMBSTONE_FORMS) {
    regionSet.add(form.region)
    placementSet.add(form.placement)
    shapeSet.add(SHAPE_LABEL_MAP[form.shape])
    for (const s of form.style) {
      styleSet.add(STYLE_LABEL_MAP[s])
    }
    for (const m of form.material) {
      materialSet.add(MATERIAL_LABEL_MAP[m])
    }
  }

  const regionOrder: FormRegion[] = [
    'east-asia', 'southeast-asia', 'south-asia', 'middle-east',
    'europe-west', 'europe-east', 'europe-north', 'europe-south',
    'north-america', 'latin-america', 'africa', 'oceania',
  ]
  const placementOrder: FormPlacement[] = ['upright', 'flat', 'slant', 'bevel', 'ledger', 'kerbed']
  const shapeLabelOrder = ['矩形', '圆拱顶', '方尖碑', '断柱', '十字形', '树桩', '心形', '书本', '佛塔', '定制']
  const styleLabelOrder = ['传统', '哥特', '极简', '自然', '赛博朋克', '巴洛克']
  const materialLabelOrder = ['花岗岩', '大理石', '青铜', '木材', '珊瑚']

  return [
    {
      dimension: 'region',
      label: '地区',
      icon: <Globe className="h-3.5 w-3.5" />,
      options: regionOrder
        .filter((r) => regionSet.has(r))
        .map((r) => ({ key: r, label: REGION_LABELS[r] })),
    },
    {
      dimension: 'placement',
      label: '形态',
      icon: <Filter className="h-3.5 w-3.5" />,
      options: placementOrder
        .filter((p) => placementSet.has(p))
        .map((p) => ({ key: p, label: PLACEMENT_LABELS[p] })),
    },
    {
      dimension: 'shape',
      label: '形状',
      icon: <Tag className="h-3.5 w-3.5" />,
      options: shapeLabelOrder
        .filter((l) => shapeSet.has(l))
        .map((l) => ({ key: l, label: l })),
    },
    {
      dimension: 'style',
      label: '风格',
      icon: <Filter className="h-3.5 w-3.5" />,
      options: styleLabelOrder
        .filter((l) => styleSet.has(l))
        .map((l) => ({ key: l, label: l })),
    },
    {
      dimension: 'material',
      label: '材质',
      icon: <Tag className="h-3.5 w-3.5" />,
      options: materialLabelOrder
        .filter((l) => materialSet.has(l))
        .map((l) => ({ key: l, label: l })),
    },
  ]
}

const FILTER_GROUPS = buildFilterOptions()

// 形状标签对应的显示标签
function getShapeDisplayLabel(shape: FormShape): string {
  return SHAPE_LABEL_MAP[shape]
}

// 地区标签对应的显示标签
function getRegionDisplayLabel(region: FormRegion): string {
  return REGION_LABELS[region]
}

export default function FormsPage() {
  const [activeFilters, setActiveFilters] = useState<Record<FilterDimension, Set<string>>>({
    region: new Set(),
    placement: new Set(),
    shape: new Set(),
    style: new Set(),
    material: new Set(),
  })

  const toggleFilter = (dimension: FilterDimension, key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev[dimension])
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return { ...prev, [dimension]: next }
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({
      region: new Set(),
      placement: new Set(),
      shape: new Set(),
      style: new Set(),
      material: new Set(),
    })
  }

  const hasActiveFilters = Object.values(activeFilters).some((s) => s.size > 0)

  const filteredForms = useMemo(() => {
    return TOMBSTONE_FORMS.filter((form) => {
      // 地区筛选
      if (activeFilters.region.size > 0 && !activeFilters.region.has(form.region)) {
        return false
      }
      // 形态筛选
      if (activeFilters.placement.size > 0 && !activeFilters.placement.has(form.placement)) {
        return false
      }
      // 形状筛选
      if (activeFilters.shape.size > 0) {
        const shapeLabel = SHAPE_LABEL_MAP[form.shape]
        if (!activeFilters.shape.has(shapeLabel)) {
          return false
        }
      }
      // 风格筛选
      if (activeFilters.style.size > 0) {
        const styleLabels = form.style.map((s) => STYLE_LABEL_MAP[s])
        if (!styleLabels.some((l) => activeFilters.style.has(l))) {
          return false
        }
      }
      // 材质筛选
      if (activeFilters.material.size > 0) {
        const materialLabels = form.material.map((m) => MATERIAL_LABEL_MAP[m])
        if (!materialLabels.some((l) => activeFilters.material.has(l))) {
          return false
        }
      }
      return true
    })
  }, [activeFilters])

  const activeFilterCount = Object.values(activeFilters).reduce((sum, s) => sum + s.size, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 页头 */}
      <header className="mb-10 flex flex-col gap-6 sm:mb-14">
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wider text-mist-dim uppercase transition-colors hover:text-mist"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            返回首页
          </Link>
          <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-mist sm:text-4xl lg:text-5xl">
            墓碑形式图鉴
          </h1>
          <p className="max-w-xl font-serif text-base leading-relaxed text-mist-soft sm:text-lg">
            探索全球40+种墓碑形式，了解不同文化对死亡的理解与表达
          </p>
        </div>
      </header>

      {/* 多维筛选栏 */}
      <div className="mb-8 space-y-4">
        {/* 筛选栏头部 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-mist-dim" aria-hidden="true" />
            <span className="text-sm font-medium text-mist-soft">
              已筛选 <span className="tabular-nums text-mist">{filteredForms.length}</span> / {TOMBSTONE_FORMS.length} 种形式
            </span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 rounded-full border border-blood/30 bg-blood/8 px-3 py-1.5 text-xs font-medium text-blood transition-all duration-300 hover:bg-blood/12"
            >
              <X className="h-3 w-3" />
              清除筛选 ({activeFilterCount})
            </button>
          )}
        </div>

        {/* 筛选维度 */}
        <div className="space-y-3">
          {FILTER_GROUPS.map((group) => (
            <div key={group.dimension} className="flex items-start gap-3">
              <div className="flex shrink-0 items-center gap-1.5 pt-1.5 text-xs font-medium tracking-wider text-mist-dim uppercase">
                {group.icon}
                {group.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.options.map((opt) => {
                  const active = activeFilters[group.dimension].has(opt.key)
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => toggleFilter(group.dimension, opt.key)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                        active
                          ? 'bg-mist text-ink-card shadow-tomb'
                          : 'border border-ink-border bg-ink-card text-mist-soft hover:border-mist-muted hover:text-mist'
                      }`}
                      aria-pressed={active}
                    >
                      {opt.label}
                      {active && <X className="h-3 w-3" aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 表单卡片网格 */}
      {filteredForms.length > 0 ? (
        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="墓碑形式展示"
        >
          {filteredForms.map((form, index) => (
            <article
              key={form.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-card animate-fade-in transition-all duration-500 ease-out-quart hover:-translate-y-1.5 hover:border-mist-muted hover:shadow-[0_24px_48px_-12px_rgba(61,58,53,0.12)]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* 顶部色条 */}
              <div
                className="h-1.5 w-full shrink-0"
                style={{ backgroundColor: form.palette.accent }}
              />

              <div className="flex flex-1 flex-col p-5">
                {/* 名称与英文名 */}
                <div className="mb-2">
                  <h2 className="font-serif text-lg font-medium tracking-wide text-mist">
                    {form.name}
                  </h2>
                  <p className="text-xs font-medium tracking-wider text-mist-dim uppercase">
                    {form.nameEn}
                  </p>
                </div>

                {/* 起源 */}
                <p className="mb-2 text-xs text-mist-dim">
                  <span className="font-medium text-mist-soft">起源：</span>
                  {form.origin}
                </p>

                {/* 描述（截断两行） */}
                <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-mist-soft">
                  {form.description}
                </p>

                {/* 标签 */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-ink-border bg-ink-soft/50 px-2 py-0.5 text-[10px] font-medium text-mist-soft">
                    {getRegionDisplayLabel(form.region)}
                  </span>
                  <span className="rounded-full border border-ink-border bg-ink-soft/50 px-2 py-0.5 text-[10px] font-medium text-mist-soft">
                    {getShapeDisplayLabel(form.shape)}
                  </span>
                  {form.style.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-ink-border bg-ink-soft/50 px-2 py-0.5 text-[10px] font-medium text-mist-soft"
                    >
                      {STYLE_LABEL_MAP[s]}
                    </span>
                  ))}
                </div>

                {/* 查看详情 */}
                <Link
                  to={`/forms/${form.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 rounded-full border border-jade/40 bg-jade/10 py-2 text-center text-sm font-medium text-jade transition-all duration-300 hover:bg-jade/15 justify-center"
                >
                  查看详情
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        /* 空状态 */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 rounded-full border border-ink-border bg-ink-soft p-4">
            <Search className="h-8 w-8 text-mist-dim" aria-hidden="true" />
          </div>
          <h3 className="mb-2 font-serif text-xl text-mist-soft">没有匹配的墓碑形式</h3>
          <p className="mb-6 max-w-sm text-sm text-mist-dim">
            当前筛选条件过于严格，请尝试调整或清除筛选条件
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-card px-5 py-2.5 text-sm font-medium text-mist-soft shadow-tomb transition-all duration-300 hover:-translate-y-0.5 hover:border-mist-muted hover:text-mist"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            清除所有筛选
          </button>
        </div>
      )}
    </div>
  )
}
/**
 * 模板选择器（US-04 第一步）
 * 三类：非遗工艺 / 文学 IP 同款 / 极简现代
 */
import { useState } from 'react'
import { Check } from 'lucide-react'
import { TEMPLATES } from '@/data/tombstones'
import type { TemplateCategory } from '@/types'
import { cn } from '@/lib/utils'

interface TemplatePickerProps {
  selected: string
  onSelect: (id: string) => void
}

const CATEGORIES: { key: TemplateCategory | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'heritage', label: '非遗工艺' },
  { key: 'literary', label: '文学 IP' },
  { key: 'minimal', label: '极简现代' },
]

export function TemplatePicker({ selected, onSelect }: TemplatePickerProps) {
  const [filter, setFilter] = useState<TemplateCategory | 'all'>('all')

  const list = TEMPLATES.filter((t) => filter === 'all' || t.category === filter)

  return (
    <div>
      {/* 分类筛选 */}
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="模板分类"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={filter === c.key}
            onClick={() => setFilter(c.key)}
            className={cn(
              'min-h-[2.25rem] rounded-full border px-4 py-1.5 text-xs font-medium transition-base focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
              filter === c.key
                ? 'border-candle/60 bg-candle/15 text-candle'
                : 'border-ink-border text-mist-dim hover:border-mist-muted hover:text-mist-soft'
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 模板网格 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            aria-pressed={selected === t.id}
            className={cn(
              'group relative overflow-hidden rounded-lg border p-3 text-left transition-base focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
              selected === t.id
                ? 'border-candle bg-candle-glow shadow-candle'
                : 'border-ink-card hover:border-mist-muted/40 hover:bg-ink-soft'
            )}
          >
            {/* 缩略图 */}
            <div
              className="mb-3 h-20 w-full rounded-md transition-transform duration-base group-hover:scale-[1.02]"
              style={{ background: t.thumbnail }}
            />
            <div className="font-serif text-sm text-mist">{t.name}</div>
            <div className="mt-1 text-[11px] text-mist-dim line-clamp-1">{t.origin}</div>

            {selected === t.id && (
              <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-candle px-2 py-0.5 text-[10px] font-medium text-ink">
                <Check className="h-3 w-3" aria-hidden="true" />
                已选
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

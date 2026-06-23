/**
 * 模板选择器（US-04 第一步）
 * 三类：非遗工艺 / 文学 IP 同款 / 极简现代
 */
import { useState } from 'react'
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
      <div className="mb-3 flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs transition-colors',
              filter === c.key
                ? 'border-candle/60 bg-candle/15 text-candle'
                : 'border-ink-card text-mist-dim hover:border-mist-dim/40 hover:text-mist-soft'
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 模板网格 */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {list.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={cn(
              'group relative overflow-hidden rounded border p-2 text-left transition-all',
              selected === t.id
                ? 'border-candle shadow-candle'
                : 'border-ink-card hover:border-mist-dim/40'
            )}
          >
            {/* 缩略图 */}
            <div
              className="mb-2 h-16 w-full rounded"
              style={{ background: t.thumbnail }}
            />
            <div className="font-serif text-xs text-mist">{t.name}</div>
            <div className="mt-0.5 text-[10px] text-mist-dim line-clamp-1">{t.origin}</div>

            {selected === t.id && (
              <span className="absolute right-1 top-1 rounded-full bg-candle px-1.5 py-0.5 text-[9px] text-ink">
                已选
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

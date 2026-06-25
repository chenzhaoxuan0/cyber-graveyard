/**
 * 故事流第3步：选装饰品
 * 多选清单，选中后将在编辑器中预置到画布
 */
import { Check } from 'lucide-react'
import { getAllDiyElements } from '@/data/tombstones'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import type { DiyElement, DiyElementType } from '@/types'

const TYPE_LABEL: Record<DiyElementType, string> = {
  text: '文本',
  pattern: '纹样',
  heritage: '非遗',
  qrcode: '二维码',
  image: '图片',
  link: '链接',
  badge: '吧唧',
  standee: '立牌',
  glowstick: '应援',
  achievement: '成就',
  danmaku: '弹幕',
  emoji: '表情',
  glitter: '闪粉',
  neon: '霓虹',
}

const TYPE_ORDER: DiyElementType[] = [
  'text', 'pattern', 'heritage', 'qrcode', 'image', 'link',
  'badge', 'standee', 'glowstick', 'achievement', 'danmaku', 'emoji', 'glitter', 'neon',
]

export function DecorationStep() {
  const decorationIds = useAppStore((s) => s.form.decorationIds)
  const setForm = useAppStore((s) => s.setForm)

  const allElements = getAllDiyElements()
  const grouped = TYPE_ORDER.map((type) => ({
    type,
    items: allElements.filter((el) => el.type === type),
  })).filter((g) => g.items.length > 0)

  const toggle = (id: string) => {
    const next = decorationIds.includes(id)
      ? decorationIds.filter((d) => d !== id)
      : [...decorationIds, id]
    setForm({ decorationIds: next })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <p className="mb-2 font-serif text-lg leading-relaxed text-mist sm:text-xl">
          在墓碑上添些有趣的小玩意吧。
        </p>
        <p className="text-xs text-mist-dim">
          这些小小的装饰，是你留给世界的最后一点调皮。
          {decorationIds.length > 0 && (
            <span className="ml-1 text-candle">已选 {decorationIds.length} 个</span>
          )}
        </p>
      </div>

      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.type}>
            <h3 className="mb-2 text-xs font-medium tracking-wider text-mist-dim uppercase">
              {TYPE_LABEL[group.type]}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {group.items.map((el: DiyElement) => {
                const selected = decorationIds.includes(el.id)
                return (
                  <button
                    key={el.id}
                    type="button"
                    onClick={() => toggle(el.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-base',
                      selected
                        ? 'border-candle/50 bg-candle/10 text-candle'
                        : 'border-ink-border bg-ink-card/60 text-mist-soft hover:bg-ink-card'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                        selected ? 'border-candle bg-candle' : 'border-ink-border'
                      )}
                    >
                      {selected && <Check className="h-2.5 w-2.5 text-white" />}
                    </span>
                    <span className="truncate">{el.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] text-mist-dim">
        装饰品可选，跳过也无妨。选中的装饰会在下一步编辑器中自动摆放到画布上。
      </p>
    </div>
  )
}

/**
 * DIY 装饰元素面板（US-05 左侧组件库）
 * 点击元素 → 调用 onAdd(elementType, content) → 由 EditorPage 添加到 fabric.js canvas
 */
import { Type, Shapes, Hammer, QrCode, Image as ImageIcon, Link, Plus } from 'lucide-react'
import type { DiyElement, DiyElementType } from '@/types'

interface DiyElementPanelProps {
  onAdd: (elementType: string, content: string) => void
  elements: DiyElement[]
}

const ICON_MAP: Record<DiyElementType, typeof Type> = {
  text: Type,
  pattern: Shapes,
  heritage: Hammer,
  qrcode: QrCode,
  image: ImageIcon,
  link: Link,
}

const TYPE_LABEL: Record<DiyElementType, string> = {
  text: '文本',
  pattern: '纹样',
  heritage: '非遗',
  qrcode: '二维码',
  image: '图片',
  link: '链接',
}

export function DiyElementPanel({ onAdd, elements }: DiyElementPanelProps) {
  // 按类型分组
  const grouped = elements.reduce<Record<string, DiyElement[]>>((acc, el) => {
    ;(acc[el.type] ??= []).push(el)
    return acc
  }, {})

  const types = Object.keys(grouped) as DiyElementType[]

  return (
    <aside className="flex h-full flex-col rounded-xl border border-ink-border bg-ink-soft/90 shadow-tomb backdrop-blur-sm">
      <div className="border-b border-ink-border px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-card text-candle shadow-candle-sm">
            <Shapes className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-serif text-sm tracking-widest text-mist">元素库</h3>
            <p className="text-[11px] leading-none text-mist-dim">点击添加到画布</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-3 sm:p-4">
        {types.map((type, typeIndex) => {
          const TypeIcon = ICON_MAP[type]
          const items = grouped[type]
          return (
            <section
              key={type}
              className="animate-fade-in"
              style={{ animationDelay: `${typeIndex * 60}ms` }}
            >
              <div className="mb-2.5 flex items-center gap-2 px-1">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-ink-card text-candle">
                  <TypeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-mist-soft">
                  {TYPE_LABEL[type]}
                </span>
                <span className="ml-auto rounded-full bg-ink-card px-1.5 py-0.5 text-[10px] tabular-nums text-mist-muted">
                  {items.length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {items.map((el) => {
                  const Icon = ICON_MAP[el.type]
                  return (
                    <button
                      key={el.id}
                      type="button"
                      onClick={() => onAdd(el.type, el.content ?? el.label)}
                      className="group relative flex min-h-[68px] flex-col items-center justify-center gap-2 rounded-lg border border-ink-border bg-ink-card/60 px-2 py-3 text-center transition-base hover:-translate-y-0.5 hover:border-candle/40 hover:bg-ink-hover hover:shadow-candle-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft cursor-pointer"
                      aria-label={`添加${TYPE_LABEL[type]}：${el.label}`}
                      title={`添加${el.label}`}
                    >
                      <Icon className="h-5 w-5 text-mist-dim transition-base group-hover:text-candle" aria-hidden="true" />
                      <span className="line-clamp-2 text-xs leading-tight text-mist-soft transition-base group-hover:text-mist">
                        {el.label}
                      </span>
                      <Plus className="absolute right-2 top-2 h-3.5 w-3.5 text-candle opacity-0 transition-base group-hover:opacity-100" aria-hidden="true" />
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </aside>
  )
}

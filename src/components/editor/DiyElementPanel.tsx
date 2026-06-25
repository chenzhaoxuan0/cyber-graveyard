import { useState } from 'react'
import { Type, Shapes, Hammer, QrCode, Image as ImageIcon, Link, Plus, Circle, RectangleVertical, Flashlight, Trophy, MessageSquare, Smile, Sparkles, Zap, Star } from 'lucide-react'
import type { DiyElement, DiyElementType } from '@/types'
import { FUNNY_EPITAPHS, EPITAPH_CATEGORIES } from '@/data/tombstones'

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
  badge: Circle,
  standee: RectangleVertical,
  glowstick: Flashlight,
  achievement: Trophy,
  danmaku: MessageSquare,
  emoji: Smile,
  glitter: Sparkles,
  neon: Zap,
}

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

export function DiyElementPanel({ onAdd, elements }: DiyElementPanelProps) {
  const [activeMemeCategory, setActiveMemeCategory] = useState<string>(EPITAPH_CATEGORIES[0].key)

  const grouped = elements.reduce<Record<string, DiyElement[]>>((acc, el) => {
    ;(acc[el.type] ??= []).push(el)
    return acc
  }, {})

  const types = Object.keys(grouped) as DiyElementType[]

  const currentMemeList = FUNNY_EPITAPHS[activeMemeCategory as keyof typeof FUNNY_EPITAPHS] ?? []

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

      <div className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-4">
        <section className="animate-fade-in rounded-lg border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent p-3">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/20 text-amber-400">
              <Smile className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              功德-1 梗文案
            </span>
            <span className="ml-auto rounded-full bg-ink-card px-1.5 py-0.5 text-[10px] tabular-nums text-mist-muted">
              点一下就上去
            </span>
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {EPITAPH_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveMemeCategory(cat.key)}
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] transition-base ${
                  activeMemeCategory === cat.key
                    ? 'bg-amber-500/80 text-black font-medium shadow-candle-sm'
                    : 'bg-ink-card text-mist-muted hover:bg-ink-hover hover:text-mist-soft'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="grid max-h-[240px] grid-cols-1 gap-1.5 overflow-y-auto pr-1">
            {currentMemeList.map((meme, idx) => (
              <button
                key={`${activeMemeCategory}-${idx}`}
                type="button"
                onClick={() => onAdd('text', meme)}
                className="group relative flex items-center gap-2 rounded-md border border-ink-border bg-ink-card/50 px-2.5 py-2 text-left transition-base hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
                title={`点击添加：${meme}`}
              >
                <Star className="h-3 w-3 flex-shrink-0 text-amber-400/60 group-hover:text-amber-400" aria-hidden="true" />
                <span className="line-clamp-1 text-[11px] leading-tight text-mist-soft group-hover:text-amber-100">
                  {meme}
                </span>
                <Plus className="ml-auto h-3 w-3 flex-shrink-0 text-amber-400 opacity-0 transition-base group-hover:opacity-100" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-ink-border"></div>
          <span className="text-[10px] uppercase tracking-wider text-mist-muted">装饰元素</span>
          <div className="h-px flex-1 bg-ink-border"></div>
        </div>

        {types.map((type, typeIndex) => {
          const TypeIcon = ICON_MAP[type]
          const items = grouped[type]
          return (
            <section
              key={type}
              className="animate-fade-in"
              style={{ animationDelay: `${(typeIndex + 1) * 60}ms` }}
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

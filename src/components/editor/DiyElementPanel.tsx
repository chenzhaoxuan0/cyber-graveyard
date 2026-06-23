/**
 * DIY 装饰元素面板（US-05 左侧组件库）
 * 点击元素 → 调用 onAdd(elementType, content) → 由 EditorPage 添加到 fabric.js canvas
 */
import { Type, Shapes, Hammer, QrCode, Image as ImageIcon, Link } from 'lucide-react'
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
    <div className="flex h-full flex-col">
      <div className="border-b border-ink-card px-3 py-2">
        <h3 className="font-serif text-sm text-mist">元 素 库</h3>
        <p className="mt-0.5 text-[10px] text-mist-dim">点击添加到画布</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {types.map((type) => (
          <div key={type} className="mb-3">
            <div className="mb-1.5 flex items-center gap-1 px-1 text-[10px] text-mist-dim">
              {(() => {
                const Icon = ICON_MAP[type]
                return <Icon className="h-3 w-3" />
              })()}
              <span>{TYPE_LABEL[type]}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {grouped[type].map((el) => {
                const Icon = ICON_MAP[el.type]
                return (
                  <button
                    key={el.id}
                    type="button"
                    onClick={() => onAdd(el.type, el.content ?? el.label)}
                    className="flex flex-col items-center gap-1 rounded border border-ink-card bg-ink/40 px-1 py-2 text-center transition-all hover:border-jade/40 hover:bg-jade-soft/10"
                  >
                    <Icon className="h-4 w-4 text-jade" />
                    <span className="text-[10px] leading-tight text-mist-soft">{el.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

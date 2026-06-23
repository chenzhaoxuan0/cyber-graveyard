/**
 * 碑文表单（US-04 第二步）
 * - 墓志铭（≤50 字，必填）
 * - 生卒年（可选）
 * - 数字遗产（最多 3 项，可选）
 * - 路过者寄语（可选）
 */
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/store'

const MAX_EPITAPH = 50
const MAX_ASSETS = 3

export function InscriptionForm() {
  const form = useAppStore((s) => s.form)
  const setForm = useAppStore((s) => s.setForm)
  const [assetInput, setAssetInput] = useState('')

  const addAsset = () => {
    const v = assetInput.trim()
    if (!v || form.digitalAssets.length >= MAX_ASSETS) return
    setForm({ digitalAssets: [...form.digitalAssets, v] })
    setAssetInput('')
  }

  const removeAsset = (idx: number) => {
    setForm({ digitalAssets: form.digitalAssets.filter((_, i) => i !== idx) })
  }

  return (
    <div className="space-y-4">
      {/* 墓志铭 */}
      <div>
        <label className="mb-1 flex items-center justify-between text-xs text-mist-soft">
          <span>
            墓 志 铭 <span className="text-blood">*</span>
          </span>
          <span className={form.epitaph.length > MAX_EPITAPH ? 'text-blood' : 'text-mist-dim'}>
            {form.epitaph.length}/{MAX_EPITAPH}
          </span>
        </label>
        <textarea
          value={form.epitaph}
          onChange={(e) => setForm({ epitaph: e.target.value.slice(0, MAX_EPITAPH) })}
          placeholder="一句话总结这一生，或留给路过者的话……"
          rows={3}
          className="w-full resize-none rounded border border-ink-card bg-ink/60 px-3 py-2 font-serif text-sm text-mist placeholder:text-mist-dim/60 focus:border-candle/50 focus:outline-none"
        />
      </div>

      {/* 生卒年 */}
      <div>
        <label className="mb-1 block text-xs text-mist-soft">生 卒 年（可选）</label>
        <input
          type="text"
          value={form.lifespan}
          onChange={(e) => setForm({ lifespan: e.target.value.slice(0, 30) })}
          placeholder="1990 – 20??"
          className="w-full rounded border border-ink-card bg-ink/60 px-3 py-2 font-mono text-sm text-mist placeholder:text-mist-dim/60 focus:border-candle/50 focus:outline-none"
        />
      </div>

      {/* 数字遗产 */}
      <div>
        <label className="mb-1 flex items-center justify-between text-xs text-mist-soft">
          <span>数 字 遗 产（可选）</span>
          <span className="text-mist-dim">{form.digitalAssets.length}/{MAX_ASSETS}</span>
        </label>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={assetInput}
            onChange={(e) => setAssetInput(e.target.value.slice(0, 40))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addAsset()
              }
            }}
            placeholder="如：某账号、某作品、某段回忆"
            disabled={form.digitalAssets.length >= MAX_ASSETS}
            className="flex-1 rounded border border-ink-card bg-ink/60 px-3 py-2 text-sm text-mist placeholder:text-mist-dim/60 focus:border-candle/50 focus:outline-none disabled:opacity-40"
          />
          <button
            type="button"
            onClick={addAsset}
            disabled={!assetInput.trim() || form.digitalAssets.length >= MAX_ASSETS}
            className="inline-flex items-center justify-center rounded border border-jade/40 bg-jade-soft/20 px-3 text-jade transition-colors enabled:hover:bg-jade-soft/40 disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {form.digitalAssets.length > 0 && (
          <ul className="mt-2 space-y-1">
            {form.digitalAssets.map((a, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded border border-ink-card bg-ink/40 px-2 py-1 text-xs text-mist-soft"
              >
                <span className="truncate">· {a}</span>
                <button
                  type="button"
                  onClick={() => removeAsset(i)}
                  className="ml-2 text-mist-dim hover:text-blood"
                  aria-label="移除"
                >
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 路过者寄语 */}
      <div>
        <label className="mb-1 block text-xs text-mist-soft">路 过 者 寄 语（可选）</label>
        <input
          type="text"
          value={form.passerbyMessage}
          onChange={(e) => setForm({ passerbyMessage: e.target.value.slice(0, 30) })}
          placeholder="如：谢谢你停下来看我"
          className="w-full rounded border border-ink-card bg-ink/60 px-3 py-2 font-serif text-sm text-mist placeholder:text-mist-dim/60 focus:border-candle/50 focus:outline-none"
        />
      </div>
    </div>
  )
}

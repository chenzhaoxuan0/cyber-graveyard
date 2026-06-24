/**
 * 碑文表单（US-04 第二步）
 * - 墓志铭（≤50 字，必填）
 * - 生卒年（可选）
 * - 数字遗产（最多 3 项，可选）
 * - 路过者寄语（可选）
 */
import { Plus, X, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
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

  const epitaphError = form.epitaph.length > 0 && form.epitaph.trim().length === 0

  const inputBase =
    'w-full rounded-lg border bg-ink/60 px-3.5 py-2.5 text-sm text-mist placeholder:text-mist-dim/50 transition-base focus:border-candle/60 focus:outline-none focus:ring-1 focus:ring-candle/30 disabled:opacity-40'

  return (
    <div className="space-y-5">
      {/* 墓志铭 */}
      <div>
        <label
          htmlFor="epitaph"
          className="mb-1.5 flex items-center justify-between text-xs font-medium text-mist-soft"
        >
          <span>
            墓 志 铭 <span className="text-blood">*</span>
          </span>
          <span
            className={cn(
              'tabular-nums',
              form.epitaph.length >= MAX_EPITAPH ? 'text-candle' : 'text-mist-dim'
            )}
          >
            {form.epitaph.length}/{MAX_EPITAPH}
          </span>
        </label>
        <textarea
          id="epitaph"
          value={form.epitaph}
          onChange={(e) => setForm({ epitaph: e.target.value.slice(0, MAX_EPITAPH) })}
          placeholder="一句话总结这一生，或留给路过者的话……"
          rows={4}
          aria-invalid={epitaphError}
          aria-describedby={epitaphError ? 'epitaph-error' : undefined}
          className={cn(
            inputBase,
            'resize-none font-serif leading-relaxed',
            epitaphError
              ? 'border-blood/60 focus:border-blood/60 focus:ring-blood/30'
              : 'border-ink-card'
          )}
        />
        {epitaphError && (
          <p id="epitaph-error" className="mt-1.5 flex items-center gap-1 text-xs text-blood">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            不能只输入空格哦
          </p>
        )}
        <p className="mt-1.5 text-[11px] text-mist-dim">
          建议 20 字以内，最能被路过的人一眼记住。
        </p>
      </div>

      {/* 生卒年 */}
      <div>
        <label htmlFor="lifespan" className="mb-1.5 block text-xs font-medium text-mist-soft">
          生 卒 年（可选）
        </label>
        <input
          id="lifespan"
          type="text"
          value={form.lifespan}
          onChange={(e) => setForm({ lifespan: e.target.value.slice(0, 30) })}
          placeholder="1990 – 20??"
          className={cn(inputBase, 'font-mono', 'border-ink-card')}
        />
      </div>

      {/* 数字遗产 */}
      <div>
        <label
          htmlFor="asset-input"
          className="mb-1.5 flex items-center justify-between text-xs font-medium text-mist-soft"
        >
          <span>数 字 遗 产（可选）</span>
          <span className="tabular-nums text-mist-dim">
            {form.digitalAssets.length}/{MAX_ASSETS}
          </span>
        </label>
        <div className="flex gap-2">
          <input
            id="asset-input"
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
            className={cn(inputBase, 'border-ink-card')}
          />
          <button
            type="button"
            onClick={addAsset}
            disabled={!assetInput.trim() || form.digitalAssets.length >= MAX_ASSETS}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-jade/40 bg-jade-soft/20 text-jade transition-base focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink enabled:hover:bg-jade-soft/40 disabled:opacity-30"
            aria-label="添加数字遗产"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {form.digitalAssets.length > 0 && (
          <ul className="mt-3 space-y-2">
            {form.digitalAssets.map((a, i) => (
              <li
                key={`${a}-${i}`}
                className="flex items-center justify-between gap-2 rounded-lg border border-ink-card bg-ink-soft/60 px-3 py-2 text-xs text-mist-soft"
              >
                <span className="truncate">· {a}</span>
                <button
                  type="button"
                  onClick={() => removeAsset(i)}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-mist-dim transition-base hover:bg-blood/10 hover:text-blood"
                  aria-label={`移除 ${a}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 路过者寄语 */}
      <div>
        <label htmlFor="passerby" className="mb-1.5 block text-xs font-medium text-mist-soft">
          路 过 者 寄 语（可选）
        </label>
        <input
          id="passerby"
          type="text"
          value={form.passerbyMessage}
          onChange={(e) => setForm({ passerbyMessage: e.target.value.slice(0, 30) })}
          placeholder="如：谢谢你停下来看我"
          className={cn(inputBase, 'border-ink-card font-serif')}
        />
      </div>
    </div>
  )
}

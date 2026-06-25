/**
 * 故事流第2步：选墓碑样式
 * 上半区文化形式（按已选地区过滤）与下半区趣味主题二选一
 */
import { Check } from 'lucide-react'
import { TEMPLATES } from '@/data/tombstones'
import { getFormsForCulture } from '@/data/story-mapping'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import type { TemplateCategory, TombstoneForm, TombstoneTemplate } from '@/types'

const CATEGORY_ORDER: TemplateCategory[] = ['heritage', 'literary', 'minimal', 'anime', 'gamer', 'meme', 'pop']
const CATEGORY_LABEL: Record<TemplateCategory, string> = {
  heritage: '非遗工艺',
  literary: '文学 IP',
  minimal: '极简现代',
  anime: '二次元',
  gamer: '玩家',
  meme: '整活',
  pop: '潮玩',
}

export function StyleStep() {
  const form = useAppStore((s) => s.form)
  const setForm = useAppStore((s) => s.setForm)

  const forms: TombstoneForm[] = getFormsForCulture(form.regionId)
  const groupedTemplates = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: TEMPLATES.filter((t) => t.category === cat),
  })).filter((g) => g.items.length > 0)

  const selectForm = (f: TombstoneForm) => {
    setForm({ formId: f.id, templateId: '' })
  }
  const selectTemplate = (t: TombstoneTemplate) => {
    setForm({ templateId: t.id, formId: '' })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <p className="mb-2 font-serif text-lg leading-relaxed text-mist sm:text-xl">
          你希望以什么形状安息？
        </p>
        <p className="text-xs text-mist-dim">一方碑形，是一种对死亡的态度。</p>
      </div>

      <p className="mb-6 text-center text-[11px] text-mist-dim">
        以下两种样式任选其一，可不选直接下一步。
      </p>

      {/* 上半区：文化形式 */}
      <section className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-serif text-sm tracking-wider text-mist-soft">文化形式</h2>
          <span className="text-[10px] text-mist-dim">
            {form.regionId ? '依你选的土地筛选' : '所有地区'}
          </span>
          <div className="h-px flex-1 bg-ink-border" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {forms.map((f) => {
            const selected = form.formId === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => selectForm(f)}
                className={cn(
                  'group relative overflow-hidden rounded-xl border p-4 text-left transition-base',
                  selected
                    ? 'bg-candle/5 shadow-tomb'
                    : 'border-ink-border bg-ink-card/60 hover:bg-ink-card'
                )}
                style={selected ? { borderColor: f.palette.accent } : undefined}
              >
                {/* 4 色块条 */}
                <div className="mb-3 flex h-2 overflow-hidden rounded-full" aria-hidden="true">
                  <span className="flex-1" style={{ backgroundColor: f.palette.bg }} />
                  <span className="flex-1" style={{ backgroundColor: f.palette.fg }} />
                  <span className="flex-1" style={{ backgroundColor: f.palette.accent }} />
                  <span className="flex-1" style={{ backgroundColor: f.palette.border }} />
                </div>

                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-serif text-base text-mist">{f.name}</h3>
                    <p className="truncate text-[11px] tracking-wider text-mist-dim">{f.nameEn}</p>
                  </div>
                  {selected && (
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: f.palette.accent }}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>

                <p className="mb-2 line-clamp-3 text-sm leading-relaxed text-mist-soft">{f.description}</p>
                <p className="mb-3 text-[11px] italic text-mist-dim">{f.symbolism}</p>

                <div className="flex flex-wrap gap-1">
                  {f.visualElements.slice(0, 4).map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-ink-border bg-ink-soft/60 px-2 py-0.5 text-[10px] text-mist-dim"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* 下半区：趣味主题 */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-serif text-sm tracking-wider text-mist-soft">趣味主题</h2>
          <span className="text-[10px] text-mist-dim">来自非遗 / 文学 / 流行文化</span>
          <div className="h-px flex-1 bg-ink-border" />
        </div>

        <div className="space-y-5">
          {groupedTemplates.map((group) => (
            <div key={group.cat}>
              <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wider text-mist-dim">
                {CATEGORY_LABEL[group.cat]}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.items.map((t) => {
                  const selected = form.templateId === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => selectTemplate(t)}
                      className={cn(
                        'group relative overflow-hidden rounded-lg border text-left transition-base',
                        selected
                          ? 'border-candle/50 shadow-tomb'
                          : 'border-ink-border hover:border-ink-border hover:bg-ink-card/40'
                      )}
                    >
                      {/* 缩略图渐变 16:9 */}
                      <div
                        className="aspect-video w-full"
                        style={{ background: t.thumbnail }}
                        aria-hidden="true"
                      />
                      <div className="px-2.5 py-2">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="truncate text-xs font-medium text-mist">{t.name}</h4>
                          {selected && (
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-candle">
                              <Check className="h-2.5 w-2.5 text-white" />
                            </span>
                          )}
                        </div>
                        <p className="truncate text-[10px] text-mist-dim">{t.origin}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

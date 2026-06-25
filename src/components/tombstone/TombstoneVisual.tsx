/**
 * 墓碑视觉组件（核心渲染层）
 * 童话花园中的真实石质墓碑，统一 1080px 宽输出
 * 用于：致敬区预览、创建预览、导出长图/视频
 */
import { useMemo, useRef, useEffect } from 'react'
import { TEMPLATES, HERITAGE_CRAFT_TOMBSTONES } from '@/data/tombstones'
import type { TombstoneTemplate } from '@/types'

/** 可编辑字段名；数字遗产按索引单独提交 */
export type EditableField =
  | 'lifespan'
  | 'epitaph'
  | 'passerbyMessage'
  | `digitalAssets.${number}`
  | 'digitalAssets'

interface TombstoneVisualProps {
  /** 模板大类或具体 style */
  template: string
  title: string
  subtitle: string
  epitaph: string
  nightMode?: boolean
  passerbyMessage?: string
  digitalAssets?: string[]
  /** 非遗工艺 id（用于查 palette） */
  craft?: string
  /** 启用内联文字编辑（contentEditable）；仅 /editor 应开启 */
  editable?: boolean
  /** 文字提交回调；field 标识哪个字段 */
  onFieldChange?: (field: EditableField, value: string) => void
  /** 强制根容器高度（用于 1080×1440 stage） */
  height?: number
}

/** 根据 template 字符串解析出 palette */
function resolvePalette(template: string, craft?: string): TombstoneTemplate['palette'] {
  // 1. 先按 craft id 查非遗工艺
  if (craft) {
    const c = HERITAGE_CRAFT_TOMBSTONES.find((x) => x.id === craft)
    if (c?.templates[0]?.palette) return c.templates[0].palette
  }
  // 2. 按 template id 查 TEMPLATES
  const byId = TEMPLATES.find((t) => t.id === template)
  if (byId) return byId.palette
  // 3. 按 style 查
  const byStyle = TEMPLATES.find((t) => t.style === template)
  if (byStyle) return byStyle.palette
  // 4. 按 category 查首个
  const byCategory = TEMPLATES.find((t) => t.category === template)
  if (byCategory) return byCategory.palette
  // 5. 兜底：花园石质
  return { bg: '#f4f1ea', fg: '#3d3a35', accent: '#8a9a8a', border: '#a8a29e' }
}

/** 花园底部装饰 */
function GardenGround({ accent }: { accent: string }) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 w-full"
      preserveAspectRatio="none"
      viewBox="0 0 400 80"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path
        d="M0 60 Q80 45 160 55 T320 50 T400 58 V80 H0 Z"
        fill="url(#grassGrad)"
      />
      <circle cx="40" cy="58" r="3" fill="#b88aa3" opacity="0.6" />
      <circle cx="120" cy="52" r="2.5" fill="#c9985d" opacity="0.6" />
      <circle cx="260" cy="54" r="3" fill="#6b8e6b" opacity="0.5" />
      <circle cx="340" cy="60" r="2" fill="#b88aa3" opacity="0.5" />
    </svg>
  )
}

export function TombstoneVisual({
  template,
  title,
  subtitle,
  epitaph,
  nightMode = false,
  passerbyMessage,
  digitalAssets,
  craft,
  editable = false,
  onFieldChange,
  height,
}: TombstoneVisualProps) {
  const palette = useMemo(() => resolvePalette(template, craft), [template, craft])

  // 真实石材色：以灰调为主，可用 accent 做微 tint
  const stoneBody = '#d6d3d1'
  const stoneDark = '#a8a29e'
  const stoneBorder = '#78716c'
  const stoneShadow = 'rgba(28, 25, 23, 0.18)'

  // 花园背景
  const gardenBg = nightMode
    ? 'linear-gradient(180deg, #2a2826 0%, #1c1a18 100%)'
    : 'linear-gradient(180deg, #f7f5f0 0%, #f0ece3 60%, #e8e4d9 100%)'
  const textColor = nightMode ? '#e7e5e4' : palette.fg

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: gardenBg,
        color: textColor,
        height: height ?? 600,
        width: '100%',
      }}
    >
      {/* 顶部柔光 */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: palette.accent }}
      />

      {/* 纸张/天空纹理 */}
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-40" />

      {/* 花园底部 */}
      <GardenGround accent={palette.accent} />

      {/* 内容区 */}
      <div className="relative z-10 flex flex-col items-center px-8 pb-28 pt-12">
        {/* 生卒年 / 标题 */}
        <div className="mb-2 text-center">
          <div
            className="font-serif text-2xl tracking-[0.3em]"
            style={{ color: textColor }}
          >
            {editable ? (
              <EditableText
                value={title}
                onCommit={(v) => onFieldChange?.('lifespan', v)}
                ariaLabel="生卒年"
              />
            ) : (
              title
            )}
          </div>
          <div className="mt-1 text-xs tracking-widest opacity-70">{subtitle}</div>
        </div>

        {/* 装饰分隔线 */}
        <div
          className="my-4 h-px w-32"
          style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)` }}
        />

        {/* 墓碑主体：真实石质造型 */}
        <div className="relative my-6 w-full max-w-[420px]">
          {/* 顶部圆球装饰 */}
          <div
            className="relative z-10 mx-auto mb-[-8px] h-5 w-5 rounded-full border-2"
            style={{ borderColor: stoneBorder, background: stoneBody }}
          />

          {/* 墓碑碑身 */}
          <div
            className="relative flex min-h-[320px] flex-col items-center justify-center rounded-t-[80px] rounded-b-lg border-2 px-8 py-10 text-center"
            style={{
              borderColor: stoneBorder,
              background: `linear-gradient(180deg, ${stoneBody} 0%, ${stoneDark} 100%)`,
              boxShadow: `0 12px 40px ${stoneShadow}, inset 0 1px 0 rgba(255,255,255,0.45)`,
            }}
          >
            {/* 内边框装饰 */}
            <div
              className="pointer-events-none absolute inset-3 rounded-t-[68px] rounded-b-sm border"
              style={{ borderColor: `${stoneBorder}66` }}
            />

            {/* 风化纹理 */}
            <div
              className="pointer-events-none absolute inset-0 rounded-t-[80px] rounded-b-lg opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
              }}
            />

            {/* 墓志铭 */}
            {editable ? (
              <EditableText
                multiline
                value={epitaph || '尚未撰写墓志铭'}
                onCommit={(v) => onFieldChange?.('epitaph', v)}
                className="font-serif text-lg leading-relaxed"
                style={{ color: textColor, textShadow: '0 1px 0 rgba(255,255,255,0.25)' }}
                ariaLabel="墓志铭"
              />
            ) : (
              <p
                className="font-serif text-lg leading-relaxed"
                style={{ color: textColor, textShadow: '0 1px 0 rgba(255,255,255,0.25)' }}
              >
                {epitaph || '尚未撰写墓志铭'}
              </p>
            )}

            {/* 数字遗产 */}
            {digitalAssets && digitalAssets.length > 0 && (
              <div className="mt-6 w-full border-t pt-4" style={{ borderColor: `${stoneBorder}66` }}>
                <div className="mb-2 text-[10px] tracking-widest opacity-60">数 字 遗 产</div>
                <ul className="space-y-1">
                  {digitalAssets.map((a, i) => (
                    <li key={i} className="font-serif text-xs opacity-80">
                      {'· '}
                      {editable ? (
                        <EditableText
                          value={a}
                          onCommit={(v) => onFieldChange?.(`digitalAssets.${i}`, v)}
                          ariaLabel={`数字遗产 ${i + 1}`}
                        />
                      ) : (
                        a
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 路过者寄语 */}
            {(passerbyMessage || editable) && (
              <div className="mt-6 w-full border-t pt-4" style={{ borderColor: `${stoneBorder}66` }}>
                <div className="mb-1 text-[10px] tracking-widest opacity-60">路 过 者</div>
                {editable ? (
                  <p className="font-serif text-xs italic opacity-80">
                    ‘<EditableText
                      value={passerbyMessage ?? ''}
                      onCommit={(v) => onFieldChange?.('passerbyMessage', v)}
                      ariaLabel="路过者寄语"
                    />’
                  </p>
                ) : (
                  <p className="font-serif text-xs italic opacity-80">“{passerbyMessage}”</p>
                )}
              </div>
            )}
          </div>

          {/* 底座 */}
          <div
            className="mx-auto mt-[-2px] h-3 w-[88%] rounded-b-sm"
            style={{
              background: `linear-gradient(180deg, ${stoneBorder}, ${stoneDark})`,
            }}
          />
          <div
            className="mx-auto h-2 w-[78%] rounded-b-sm opacity-60"
            style={{ background: stoneBorder }}
          />
        </div>

        {/* 底部装饰 */}
        <div
          className="mt-2 h-px w-48"
          style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}88, transparent)` }}
        />
        <div className="mt-3 text-[10px] tracking-[0.4em] opacity-40">
          赛 博 墓 园 · CYBER GRAVEYARD
        </div>
      </div>
    </div>
  )
}

/** 非受控 contentEditable：JSX 不渲染 children，textContent 由 effect 同步。
 *  避免 React 19 reconciliation 在用户输入时重写 DOM 导致光标跳到行首。
 *  中文 IME 用 compositionstart/end 守护，组合期间不提交。 */
function EditableText({
  value,
  onCommit,
  className,
  style,
  multiline,
  ariaLabel,
}: {
  value: string
  onCommit: (v: string) => void
  className?: string
  style?: React.CSSProperties
  multiline?: boolean
  ariaLabel?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const composingRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.textContent !== value) {
      // 用户正在编辑时不强制同步，避免光标跳
      if (document.activeElement !== el) el.textContent = value
    }
  }, [value])

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    if (composingRef.current) return
    onCommit((e.currentTarget as HTMLElement).textContent ?? '')
  }
  const handleCompositionEnd = (e: React.CompositionEvent<HTMLElement>) => {
    composingRef.current = false
    onCommit((e.target as HTMLElement).textContent ?? '')
  }
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    onCommit(e.currentTarget.textContent ?? '')
  }

  const editableStyle: React.CSSProperties = { ...style, outline: 'none', cursor: 'text' }

  if (multiline) {
    return (
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className={className}
        style={editableStyle}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label={ariaLabel}
        onInput={handleInput}
        onCompositionStart={() => (composingRef.current = true)}
        onCompositionEnd={handleCompositionEnd}
        onBlur={handleBlur}
      />
    )
  }
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={className}
      style={editableStyle}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={ariaLabel}
      onInput={handleInput}
      onCompositionStart={() => (composingRef.current = true)}
      onCompositionEnd={handleCompositionEnd}
      onBlur={handleBlur}
    />
  )
}

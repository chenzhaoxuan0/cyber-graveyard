/**
 * 墓碑视觉组件（核心渲染层）
 * 根据 template 选择不同的视觉风格，统一 1080px 宽输出
 * 用于：致敬区预览、创建预览、导出长图/视频
 */
import { useMemo } from 'react'
import { TEMPLATES, HERITAGE_CRAFT_TOMBSTONES } from '@/data/tombstones'
import type { TombstoneTemplate } from '@/types'

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
  // 5. 兜底
  return { bg: '#0a0a0f', fg: '#e6e6f0', accent: '#f5c542', border: '#2a2a3a' }
}

export function TombstoneVisual({
  template,
  title,
  subtitle,
  epitaph,
  nightMode = true,
  passerbyMessage,
  digitalAssets,
  craft,
}: TombstoneVisualProps) {
  const palette = useMemo(() => resolvePalette(template, craft), [template, craft])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${palette.bg} 0%, ${palette.bg}ee 100%)`,
        color: palette.fg,
        minHeight: 600,
      }}
    >
      {/* 顶部烛光 */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: palette.accent }}
      />

      {/* 噪点纹理 */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-30" />

      {/* 内容区 */}
      <div className="relative z-10 flex flex-col items-center px-8 py-12">
        {/* 生卒年 / 标题 */}
        <div className="mb-2 text-center">
          <div
            className="font-serif text-2xl tracking-[0.3em]"
            style={{ color: palette.fg }}
          >
            {title}
          </div>
          <div className="mt-1 text-xs tracking-widest opacity-70">{subtitle}</div>
        </div>

        {/* 装饰分隔线 */}
        <div
          className="my-4 h-px w-32"
          style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)` }}
        />

        {/* 墓碑主体 - 优化造型：圆顶 + 两侧装饰 + 底座 */}
        <div className="relative my-6 w-full max-w-[420px]">
          {/* 顶部圆球装饰 */}
          <div className="relative mx-auto mb-[-8px] h-5 w-5 rounded-full border-2 z-10" style={{ borderColor: palette.accent, background: palette.bg }} />

          {/* 墓碑碑身 */}
          <div
            className="relative flex min-h-[320px] flex-col items-center justify-center rounded-t-[80px] rounded-b-lg border-2 px-8 py-10 text-center"
            style={{
              borderColor: palette.border,
              background: `${palette.bg}aa`,
              boxShadow: `0 0 40px ${palette.accent}22, inset 0 0 20px ${palette.bg}`,
            }}
          >
            {/* 内边框装饰 */}
            <div
              className="pointer-events-none absolute inset-3 rounded-t-[68px] rounded-b-sm border"
              style={{ borderColor: `${palette.accent}33` }}
            />

            {/* 墓志铭 */}
            <p
              className="font-serif text-lg leading-relaxed"
              style={{ color: palette.fg }}
            >
              {epitaph || '尚未撰写墓志铭'}
            </p>

            {/* 数字遗产 */}
            {digitalAssets && digitalAssets.length > 0 && (
              <div className="mt-6 w-full border-t pt-4" style={{ borderColor: `${palette.border}66` }}>
                <div className="mb-2 text-[10px] tracking-widest opacity-60">数 字 遗 产</div>
                <ul className="space-y-1">
                  {digitalAssets.map((a, i) => (
                    <li key={i} className="font-serif text-xs opacity-80">
                      · {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 路过者寄语 */}
            {passerbyMessage && (
              <div className="mt-6 w-full border-t pt-4" style={{ borderColor: `${palette.border}66` }}>
                <div className="mb-1 text-[10px] tracking-widest opacity-60">路 过 者</div>
                <p className="font-serif text-xs italic opacity-80">“{passerbyMessage}”</p>
              </div>
            )}
          </div>

          {/* 底座 */}
          <div
            className="mx-auto mt-[-2px] h-3 w-[88%] rounded-b-sm"
            style={{
              background: `linear-gradient(180deg, ${palette.border}, ${palette.bg})`,
            }}
          />
          <div
            className="mx-auto h-2 w-[78%] rounded-b-sm opacity-60"
            style={{ background: palette.border }}
          />
        </div>

        {/* 底部装饰 */}
        <div
          className="mt-4 h-px w-48"
          style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}88, transparent)` }}
        />
        <div className="mt-3 text-[10px] tracking-[0.4em] opacity-40">
          赛 博 墓 园 · CYBER GRAVEYARD
        </div>

        {!nightMode && (
          <div className="mt-2 text-[10px] opacity-30">日间模式</div>
        )}
      </div>
    </div>
  )
}

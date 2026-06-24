/**
 * 注意事项卡片（US-04 第三步）
 * 默认收起，只在用户主动展开时显示热线信息。
 * 在填写情绪相关内容时，可让用户选择是否查看援助资源。
 */
import { useState } from 'react'
import { Phone, ShieldCheck, EyeOff, ChevronDown, ChevronUp } from 'lucide-react'
import { CORE_HOTLINES } from '@/data/tombstones'
import { cn } from '@/lib/utils'

export function NoticeCard() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border bg-ink-card/70 shadow-tomb backdrop-blur transition-base',
        expanded ? 'border-jade/30' : 'border-ink-border'
      )}
    >
      {/* 折叠态：一行简洁说明 */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-jade/10">
            <ShieldCheck className="h-3.5 w-3.5 text-jade" aria-hidden="true" />
          </div>
          <span className="text-sm text-mist-soft">
            本工具为文化致敬与情绪表达，不替代专业心理援助
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-xs text-jade">
          <span className="hidden sm:inline">{expanded ? '收起' : '展开'}</span>
          {expanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* 展开态：完整提示与热线 */}
      {expanded && (
        <div className="border-t border-ink-border px-4 py-4 animate-fade-in">
          <ul className="space-y-2.5 text-xs leading-relaxed text-mist-soft">
            <li className="flex gap-2">
              <div className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-jade/10">
                <ShieldCheck className="h-3 w-3 text-jade" aria-hidden="true" />
              </div>
              <span>
                本工具仅为<b className="text-mist">文化致敬与情绪表达</b>用途，不替代任何专业心理援助或医疗干预。
              </span>
            </li>
            <li className="flex gap-2">
              <div className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-jade/10">
                <EyeOff className="h-3 w-3 text-jade" aria-hidden="true" />
              </div>
              <span>
                所有内容<b className="text-mist">仅在你浏览器本地处理</b>，不上传、不存储、不收集任何数据。
              </span>
            </li>
            <li className="flex gap-2">
              <div className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-candle/10">
                <Phone className="h-3 w-3 text-candle" aria-hidden="true" />
              </div>
              <span>
                若你正经历强烈情绪困扰，请<b className="text-candle">立即拨打</b>下方援助热线：
              </span>
            </li>
          </ul>

          <div className="mt-4 grid grid-cols-1 gap-2 rounded-lg bg-ink-soft/60 p-2 sm:grid-cols-3">
            {CORE_HOTLINES.map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number}`}
                className="group block rounded-lg border border-ink-border bg-ink-card px-2 py-2 text-center transition-base hover:border-jade/40 hover:bg-jade/5"
              >
                <div className="font-mono text-sm text-jade group-hover:text-jade-soft">{h.number}</div>
                <div className="text-[10px] text-mist-dim">{h.organization}</div>
              </a>
            ))}
          </div>

          <p className="mt-3 text-center text-[10px] text-mist-dim">
            24 小时 · 全国统一心理援助热线 12356
          </p>
        </div>
      )}
    </div>
  )
}

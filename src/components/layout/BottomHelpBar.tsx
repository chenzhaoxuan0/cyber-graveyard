import { useState } from 'react'
import { LifeBuoy, ChevronUp, ChevronDown, Phone, X } from 'lucide-react'
import { useAppStore } from '@/store'
import { CORE_HOTLINES, HOTLINES } from '@/data/tombstones'

/**
 * 底部援助条（US-01）
 * 常驻屏幕底部，含 3 条核心热线
 * 可展开查看全部热线列表，可点击跳转 footer 下载 CSV
 */
export function BottomHelpBar() {
  const visible = useAppStore((s) => s.bottomBarVisible)
  const setVisible = useAppStore((s) => s.setBottomBarVisible)
  const [expanded, setExpanded] = useState(false)

  if (!visible) return null

  const scrollToFooter = () => {
    document.getElementById('site-footer')?.scrollIntoView({ behavior: 'smooth' })
    setExpanded(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-jade-soft/40 bg-ink-soft/95 backdrop-blur">
      {/* 展开后的完整热线列表 */}
      {expanded && (
        <div className="max-h-[50vh] overflow-y-auto border-b border-ink-card bg-ink animate-fade-in">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-serif text-sm font-medium text-candle">
                全国心理援助热线（含港澳台）
              </h3>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-mist-dim transition-base hover:bg-ink-card hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                收起
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
            <ul className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
              {HOTLINES.map((h) => (
                <li
                  key={h.organization}
                  className="flex items-baseline gap-2 rounded-md px-2 py-1.5 transition-base hover:bg-ink-card"
                >
                  <span className="w-10 shrink-0 text-mist-dim">[{h.region}]</span>
                  <span className="flex-1 text-mist-soft">{h.organization}</span>
                  <a
                    href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
                    className="rounded-sm font-mono text-candle transition-base hover:text-candle-soft hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {h.number}
                  </a>
                  <span className="hidden text-mist-dim sm:inline">{h.hours}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={scrollToFooter}
              className="mt-3 inline-flex items-center gap-1 rounded-md px-1 text-xs font-medium text-jade transition-base hover:text-jade-soft hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              下载完整 CSV
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {/* 核心热线条 */}
      <div className="mx-auto flex min-h-[48px] max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <LifeBuoy className="h-4 w-4 shrink-0 text-jade" aria-hidden="true" />
          <span className="text-mist-soft">心理援助：</span>
          {CORE_HOTLINES.map((h, i) => (
            <a
              key={h.number}
              href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1 rounded-md bg-ink-card px-2 py-1 font-mono text-candle transition-base hover:bg-jade-soft/30 hover:text-candle-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              {h.number}
              {i < CORE_HOTLINES.length - 1 && <span className="ml-1 text-mist-dim">·</span>}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="hotline-expanded-panel"
            className="flex h-8 items-center gap-1 rounded-md border border-mist-dim/40 px-2.5 text-xs font-medium text-mist-soft transition-base hover:border-jade hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft"
          >
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {expanded ? '收起' : '展开全部'}
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="关闭援助条"
            className="flex h-8 w-8 items-center justify-center rounded-md text-mist-dim transition-base hover:bg-ink-card hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

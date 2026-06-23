import { useState } from 'react'
import { LifeBuoy, ChevronUp, ChevronDown, Phone } from 'lucide-react'
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
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-jade-soft/40 bg-ink-soft/95 backdrop-blur">
      {/* 展开后的完整热线列表 */}
      {expanded && (
        <div className="max-h-[50vh] overflow-y-auto border-b border-ink-card bg-ink">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-serif text-sm text-candle">全国心理援助热线（含港澳台）</h3>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-xs text-mist-dim hover:text-mist"
              >
                收起
              </button>
            </div>
            <ul className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
              {HOTLINES.map((h) => (
                <li key={h.organization} className="flex items-baseline gap-2 rounded px-2 py-1 hover:bg-ink-card">
                  <span className="w-10 shrink-0 text-mist-dim">[{h.region}]</span>
                  <span className="flex-1 text-mist-soft">{h.organization}</span>
                  <a
                    href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
                    className="font-mono text-candle hover:underline"
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
              className="mt-3 text-xs text-jade hover:underline"
            >
              下载完整 CSV →
            </button>
          </div>
        </div>
      )}

      {/* 核心热线条 */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <LifeBuoy className="h-4 w-4 shrink-0 text-jade" />
          <span className="text-mist-soft">心理援助：</span>
          {CORE_HOTLINES.map((h, i) => (
            <a
              key={h.number}
              href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1 rounded bg-ink-card px-2 py-0.5 font-mono text-candle transition-colors hover:bg-jade-soft/30"
            >
              <Phone className="h-3 w-3" />
              {h.number}
              {i < CORE_HOTLINES.length - 1 && <span className="ml-1 text-mist-dim">·</span>}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 rounded border border-mist-dim/40 px-2 py-1 text-xs text-mist-soft transition-colors hover:border-jade hover:text-jade"
          >
            {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
            {expanded ? '收起' : '展开全部'}
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="关闭援助条"
            className="rounded p-1 text-mist-dim transition-colors hover:text-mist"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

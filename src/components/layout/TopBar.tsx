import { X, Heart } from 'lucide-react'
import { useAppStore } from '@/store'

/**
 * 顶部安全条（US-01）
 * 固定在页面顶部，文字：「热爱你的生活 · 本网站为娱乐创作平台 · 18+」
 * 用户可点击 × 关闭
 */
export function TopBar() {
  const visible = useAppStore((s) => s.topBarVisible)
  const setVisible = useAppStore((s) => s.setTopBarVisible)

  if (!visible) return null

  return (
    <div
      role="banner"
      aria-label="安全提示"
      className="sticky top-0 z-50 border-b border-blood-soft/40 bg-ink-soft/95 backdrop-blur"
    >
      <div className="relative mx-auto flex min-h-[40px] max-w-6xl items-center justify-center gap-2 px-4 py-2 text-xs text-mist-soft sm:text-sm">
        <Heart className="h-3.5 w-3.5 shrink-0 animate-flicker text-blood" aria-hidden="true" />
        <span className="text-center font-sans tracking-wide">
          <span className="font-medium text-candle">热爱你的生活</span>
          <span className="mx-2 text-mist-dim">·</span>
          <span>本网站为娱乐创作平台</span>
          <span className="mx-2 text-mist-dim">·</span>
          <span className="rounded border border-blood/60 px-1.5 py-0.5 text-[10px] font-medium text-blood">
            18+
          </span>
        </span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="关闭安全提示"
          className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-md text-mist-dim transition-base hover:bg-ink-card hover:text-mist focus-visible:ring-2 focus-visible:ring-candle focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

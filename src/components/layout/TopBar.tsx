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
    <div className="sticky top-0 z-50 border-b border-blood-soft/40 bg-ink-soft/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-xs text-mist-soft sm:text-sm">
        <Heart className="h-3.5 w-3.5 shrink-0 animate-flicker text-blood" />
        <span className="text-center font-sans tracking-wide">
          <span className="text-candle">热爱你的生活</span>
          <span className="mx-2 text-mist-dim">·</span>
          <span>本网站为娱乐创作平台</span>
          <span className="mx-2 text-mist-dim">·</span>
          <span className="rounded border border-blood/60 px-1.5 py-0.5 text-[10px] text-blood">18+</span>
        </span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="关闭安全提示"
          className="absolute right-3 rounded p-1 text-mist-dim transition-colors hover:bg-ink-card hover:text-mist"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

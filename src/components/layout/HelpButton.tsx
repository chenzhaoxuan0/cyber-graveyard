import { useState } from 'react'
import { Heart } from 'lucide-react'
import { BottomHelpBar } from './BottomHelpBar'

/**
 * 花园里的帮助种子
 * 心理援助信息不再常驻屏幕，只在用户主动点击时展开。
 */
export function HelpButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="需要帮助或倾诉"
        className="fixed right-4 bottom-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-jade/40 bg-ink-card/90 text-jade shadow-tomb backdrop-blur transition-base hover:scale-105 hover:border-jade hover:shadow-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <Heart className="h-5 w-5 animate-sway" aria-hidden="true" />
      </button>
      <BottomHelpBar open={open} onClose={() => setOpen(false)} />
    </>
  )
}

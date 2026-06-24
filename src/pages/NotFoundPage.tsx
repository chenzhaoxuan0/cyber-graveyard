import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="mb-2 font-mono text-xs tracking-[0.4em] text-mist-dim">404</p>
      <h1 className="mb-4 font-serif text-4xl text-blood">此 处 无 墓</h1>
      <p className="mb-8 font-serif text-base italic text-mist-soft">
        「你走过的路，没有墓碑。」
      </p>
      <Link
        to="/"
        className="inline-flex cursor-pointer items-center gap-2 rounded border border-candle/60 bg-candle/10 px-4 py-2 text-sm text-candle transition-base hover:bg-candle/20 hover:shadow-candle-sm"
      >
        <Home className="h-4 w-4" />
        回到墓园入口
      </Link>
    </div>
  )
}

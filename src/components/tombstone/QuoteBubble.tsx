/**
 * 引言语泡（文学 IP 详情页四象限之"金句"用）
 */
interface QuoteBubbleProps {
  text: string
  context: string
}

export function QuoteBubble({ text, context }: QuoteBubbleProps) {
  return (
    <figure className="relative rounded border border-jade-soft/30 bg-ink/60 p-3 transition-colors hover:border-jade/40">
      <div className="mb-1 flex items-start gap-1.5">
        <span className="mt-0.5 font-serif text-lg leading-none text-jade/60">“</span>
        <blockquote className="flex-1 font-serif text-sm leading-relaxed text-mist">
          {text}
        </blockquote>
      </div>
      <figcaption className="text-right text-xs text-mist-dim">—— {context}</figcaption>
    </figure>
  )
}

/**
 * 注意事项卡片（US-04 第三步）
 * 提示用户：本工具不替代专业援助、紧急情况请拨打热线、不收集数据等
 */
import { AlertTriangle, Phone, ShieldCheck, EyeOff } from 'lucide-react'
import { CORE_HOTLINES } from '@/data/tombstones'

export function NoticeCard() {
  return (
    <div className="rounded-lg border border-blood/25 bg-blood-glow p-4 shadow-tomb">
      <div className="mb-3 flex items-center gap-2">
        <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blood/15">
          <AlertTriangle className="h-4 w-4 text-blood" aria-hidden="true" />
        </div>
        <h3 className="font-serif text-sm text-blood">使 用 须 知</h3>
      </div>

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

      <div className="mt-4 grid grid-cols-1 gap-2 rounded-md bg-ink/60 p-2 sm:grid-cols-3">
        {CORE_HOTLINES.map((h) => (
          <a
            key={h.number}
            href={`tel:${h.number}`}
            className="group block rounded border border-candle/15 bg-candle/5 px-2 py-2 text-center transition-base hover:border-candle/30 hover:bg-candle/10"
          >
            <div className="font-mono text-sm text-candle group-hover:text-candle-soft">{h.number}</div>
            <div className="text-[10px] text-mist-dim">{h.organization}</div>
          </a>
        ))}
      </div>

      <p className="mt-3 text-center text-[10px] text-mist-dim">
        24 小时 · 全国统一心理援助热线 12356
      </p>
    </div>
  )
}

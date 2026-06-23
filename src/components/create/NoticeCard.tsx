/**
 * 注意事项卡片（US-04 第三步）
 * 提示用户：本工具不替代专业援助、紧急情况请拨打热线、不收集数据等
 */
import { AlertTriangle, Phone, ShieldCheck, EyeOff } from 'lucide-react'
import { CORE_HOTLINES } from '@/data/tombstones'

export function NoticeCard() {
  return (
    <div className="rounded border border-blood/30 bg-blood/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-blood" />
        <h3 className="font-serif text-sm text-blood">使 用 须 知</h3>
      </div>

      <ul className="space-y-2 text-xs leading-relaxed text-mist-soft">
        <li className="flex gap-1.5">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
          <span>
            本工具仅为<b className="text-mist">文化致敬与情绪表达</b>用途，不替代任何专业心理援助或医疗干预。
          </span>
        </li>
        <li className="flex gap-1.5">
          <EyeOff className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jade" />
          <span>
            所有内容<b className="text-mist">仅在你浏览器本地处理</b>，不上传、不存储、不收集任何数据。
          </span>
        </li>
        <li className="flex gap-1.5">
          <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-candle" />
          <span>
            若你正经历强烈情绪困扰，请<b className="text-candle">立即拨打</b>下方援助热线：
          </span>
        </li>
      </ul>

      <div className="mt-3 grid grid-cols-1 gap-1.5 rounded bg-ink/60 p-2 sm:grid-cols-3">
        {CORE_HOTLINES.map((h) => (
          <a
            key={h.number}
            href={`tel:${h.number}`}
            className="block rounded border border-candle/20 bg-candle/5 px-2 py-1.5 text-center transition-colors hover:bg-candle/15"
          >
            <div className="font-mono text-sm text-candle">{h.number}</div>
            <div className="text-[10px] text-mist-dim">{h.organization}</div>
          </a>
        ))}
      </div>

      <p className="mt-2 text-center text-[10px] text-mist-dim">
        24 小时 · 全国统一心理援助热线 12356
      </p>
    </div>
  )
}

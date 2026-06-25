/**
 * 故事流第4步：填文字/链接/图片
 */
import { InscriptionForm } from '@/components/create/InscriptionForm'

export function InscriptionStep() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <p className="mb-2 font-serif text-lg leading-relaxed text-mist sm:text-xl">
          最后，写下你想留给这个世界的话。
        </p>
        <p className="text-xs text-mist-dim">文字会消逝，但此刻的真心不会。</p>
      </div>
      <InscriptionForm />
    </div>
  )
}

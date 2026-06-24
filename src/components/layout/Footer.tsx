import { Link } from 'react-router-dom'
import { Download, Heart, Shield, Flower2 } from 'lucide-react'

const footerLinkClass =
  'rounded-sm px-1 py-0.5 text-mist-dim transition-base hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft'

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-ink-border bg-ink-soft/70 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* 免责声明 */}
        <section
          aria-labelledby="footer-disclaimer-heading"
          className="mb-5 rounded-xl border border-ink-border bg-ink-card/60 p-4 shadow-tomb"
        >
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 shrink-0 text-jade" aria-hidden="true" />
            <h2 id="footer-disclaimer-heading" className="font-serif text-sm font-medium text-mist">
              免责声明
            </h2>
          </div>
          <p className="text-xs leading-relaxed text-mist-soft">
            「赛博墓园」是一个面向生者的娱乐创作平台，所有墓碑、墓志铭均为用户即兴创作，不代表真实死亡事件。
            本站不提供 AI 生成内容、不存储用户数据、不进行风险内容检测。如果你此刻正经历情绪困扰，
            请点击右下角帮助按钮或下载下方心理援助热线表。
          </p>
        </section>

        {/* 心理援助热线下载 */}
        <section
          aria-labelledby="footer-hotline-heading"
          className="mb-6 rounded-xl border border-ink-border bg-ink-card/60 p-4 shadow-tomb"
        >
          <div className="mb-2 flex items-center gap-2">
            <Heart className="h-4 w-4 shrink-0 text-jade" aria-hidden="true" />
            <h2 id="footer-hotline-heading" className="font-serif text-sm font-medium text-mist">
              心理援助热线
            </h2>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-mist-soft">
            覆盖全国（含港澳台）共 25 条心理援助热线，24 小时在线。
          </p>
          <a
            href="/心理援助热线.csv"
            download="心理援助热线.csv"
            className="inline-flex items-center gap-2 rounded-md border border-jade/50 bg-jade/10 px-3 py-1.5 text-xs font-medium text-jade transition-base hover:border-jade hover:bg-jade/15 hover:shadow-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            下载心理援助热线表（CSV）
          </a>
        </section>

        {/* 链接区 */}
        <div className="flex flex-col gap-3 border-t border-ink-border pt-4 text-xs text-mist-dim sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="页脚导航" className="flex flex-wrap items-center gap-2">
            <Link to="/" className={footerLinkClass}>
              首页
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/tribute" className={footerLinkClass}>
              致敬区
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/create" className={footerLinkClass}>
              做我的墓碑
            </Link>
            <span aria-hidden="true">·</span>
            <a
              href="#user-agreement"
              className={footerLinkClass}
              onClick={(e) => {
                e.preventDefault()
                alert('用户协议：本站为纯工具型娱乐创作平台，不存储用户数据，不承担内容审核责任。所有创作内容仅在本会话内有效，关闭页面即丢失。')
              }}
            >
              用户协议
            </a>
          </nav>
          <div className="flex items-center gap-1.5 font-serif text-mist-muted">
            <Flower2 className="h-3.5 w-3.5 text-jade" aria-hidden="true" />
            <span>© 2026 赛博墓园 · 热爱你的生活</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

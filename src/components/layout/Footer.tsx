import { Link } from 'react-router-dom'
import { Download, Heart, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-ink-card bg-ink-soft/80 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 免责声明 */}
        <div className="mb-6 rounded border border-blood-soft/40 bg-ink-card/60 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-blood" />
            <h2 className="font-serif text-sm text-candle">免责声明</h2>
          </div>
          <p className="text-xs leading-relaxed text-mist-soft">
            「赛博墓园」是一个面向生者的娱乐创作平台，所有墓碑、墓志铭均为用户即兴创作，不代表真实死亡事件。
            本站不提供 AI 生成内容、不存储用户数据、不进行风险内容检测。如果你此刻正经历情绪困扰，
            请记得有人愿意听你说话——下方心理援助热线 24 小时在线。
          </p>
        </div>

        {/* 心理援助热线下载 */}
        <div className="mb-6 rounded border border-jade-soft/40 bg-ink-card/60 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Heart className="h-4 w-4 text-jade" />
            <h2 className="font-serif text-sm text-candle">心理援助热线</h2>
          </div>
          <p className="mb-3 text-xs text-mist-soft">
            覆盖全国（含港澳台）共 25 条心理援助热线，24 小时在线。
          </p>
          <a
            href="/心理援助热线.csv"
            download="心理援助热线.csv"
            className="inline-flex items-center gap-2 rounded border border-jade/60 bg-jade-soft/20 px-3 py-1.5 text-xs text-jade transition-colors hover:bg-jade-soft/40"
          >
            <Download className="h-3.5 w-3.5" />
            下载心理援助热线表（CSV）
          </a>
        </div>

        {/* 链接区 */}
        <div className="flex flex-col gap-2 border-t border-ink-card pt-4 text-xs text-mist-dim sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/" className="hover:text-mist">首页</Link>
            <span>·</span>
            <Link to="/tribute" className="hover:text-mist">致敬区</Link>
            <span>·</span>
            <Link to="/create" className="hover:text-mist">做我的墓碑</Link>
            <span>·</span>
            <a
              href="#user-agreement"
              className="hover:text-mist"
              onClick={(e) => {
                e.preventDefault()
                alert('用户协议：本站为纯工具型娱乐创作平台，不存储用户数据，不承担内容审核责任。所有创作内容仅在本会话内有效，关闭页面即丢失。')
              }}
            >
              用户协议
            </a>
          </div>
          <div className="font-mono">
            © 2026 赛博墓园 · 热爱你的生活
          </div>
        </div>
      </div>
    </footer>
  )
}

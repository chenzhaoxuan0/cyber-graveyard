/**
 * 赛博墓园 - 核心类型定义
 */

/** 模板大类 */
export type TemplateCategory = 'heritage' | 'literary' | 'minimal'

/** 墓碑模板元数据 */
export interface TombstoneTemplate {
  id: string
  name: string
  category: TemplateCategory
  /** 工艺/IP 来源描述 */
  origin: string
  /** 主色调（用于 CSS 变量） */
  palette: {
    bg: string
    fg: string
    accent: string
    border: string
  }
  /** 模板视觉风格标识，用于渲染层选择 */
  style: 'stone-classic' | 'brick-huizhou' | 'stele-suzhou' | 'silver-miao' | 'lacquer-yi' | 'literary-dumbledore' | 'literary-daiyu' | 'literary-prince' | 'literary-wukong' | 'literary-quixote' | 'minimal-white' | 'minimal-black' | 'minimal-jade'
  /** 缩略图（CSS 渐变或 SVG data URI） */
  thumbnail: string
}

/** 文学 IP 墓碑数据 */
export interface LiteraryIpTombstone {
  id: string
  character: string
  work: string
  role: string
  epitaph: string
  /** 四象限内容 */
  relics: string[]
  scenes: string[]
  quotes: { text: string; context: string }[]
  deathScene: string
  /** 视觉风格 */
  style: TombstoneTemplate['style']
  palette: TombstoneTemplate['palette']
  /** 生卒年（虚构） */
  lifespan: string
}

/** 非遗工艺墓碑数据 */
export interface HeritageCraftTombstone {
  id: string
  craft: string
  region: string
  /** 工艺小知识 */
  knowledge: {
    origin: string
    feature: string
    history: string
  }
  /** 模板示例 */
  templates: {
    name: string
    style: TombstoneTemplate['style']
    palette: TombstoneTemplate['palette']
  }[]
}

/** 用户碑文表单 */
export interface InscriptionForm {
  epitaph: string
  lifespan: string
  digitalAssets: string[]
  passerbyMessage: string
  templateId: string
}

/** DIY 装饰元素类型 */
export type DiyElementType = 'text' | 'pattern' | 'heritage' | 'qrcode' | 'image' | 'link'

/** DIY 装饰元素（fabric.js 对象的元数据） */
export interface DiyElement {
  id: string
  type: DiyElementType
  label: string
  /** 默认内容/URL */
  content?: string
}

/** 导出格式 */
export type ExportFormat = 'image' | 'video'

/** 援助热线条目 */
export interface HotlineEntry {
  region: string
  organization: string
  number: string
  hours: string
  note: string
}

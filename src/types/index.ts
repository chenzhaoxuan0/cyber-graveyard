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

// ===== 墓碑形式目录（新增） =====

/** 墓碑摆放形态 */
export type FormPlacement = 'upright' | 'flat' | 'slant' | 'bevel' | 'ledger' | 'kerbed'

/** 墓碑形状 */
export type FormShape =
  | 'rectangular' | 'rounded-arch' | 'ogee' | 'obelisk' | 'obelisk-truncated'
  | 'broken-column' | 'column' | 'gateway' | 'cross-latin' | 'cross-celtic'
  | 'cross-greek' | 'cross-maltese' | 'tree-stump' | 'tree' | 'heart'
  | 'book' | 'chest-tomb' | 'table-tomb' | 'boulder' | 'stele'
  | 'pagoda' | 'gorinto' | 'stupa' | 'dolmen' | 'menhir'
  | 'custom-sculptural' | 'architectural'

/** 墓碑地区 */
export type FormRegion =
  | 'east-asia' | 'southeast-asia' | 'south-asia' | 'middle-east'
  | 'europe-west' | 'europe-east' | 'europe-north' | 'europe-south'
  | 'north-america' | 'latin-america' | 'africa' | 'oceania'

/** 墓碑文化 */
export type FormCulture =
  | 'chinese' | 'japanese' | 'korean' | 'vietnamese' | 'filipino' | 'thai'
  | 'indonesian' | 'indian' | 'turkish' | 'british' | 'french' | 'italian'
  | 'german' | 'russian' | 'spanish' | 'nordic' | 'american' | 'mexican'
  | 'argentine' | 'african' | 'islamic' | 'christian' | 'jewish' | 'buddhist'
  | 'modern'

/** 墓碑材质 */
export type FormMaterial =
  | 'granite' | 'marble' | 'limestone' | 'sandstone' | 'slate'
  | 'bronze' | 'cast-iron' | 'zinc' | 'wood' | 'concrete' | 'coral'

/** 墓碑时期 */
export type FormPeriod =
  | 'ancient' | 'classical' | 'medieval' | 'renaissance'
  | '18th-century' | 'victorian' | 'edwardian'
  | '20th-century' | 'modern' | 'contemporary'

/** 墓碑风格 */
export type FormStyle =
  | 'traditional' | 'gothic' | 'neoclassical' | 'art-deco'
  | 'art-nouveau' | 'egyptian-revival' | 'minimalist'
  | 'rustic' | 'eco-nature' | 'cyberpunk' | 'steampunk' | 'baroque'

/** 墓碑宗教 */
export type FormReligion =
  | 'christian-catholic' | 'christian-protestant' | 'christian-orthodox'
  | 'jewish' | 'islamic' | 'buddhist' | 'hindu' | 'sikh' | 'secular'

/** 墓碑形式模板 */
export interface TombstoneForm {
  id: string
  name: string
  nameEn: string
  placement: FormPlacement
  shape: FormShape
  region: FormRegion
  culture: FormCulture[]
  material: FormMaterial[]
  period: FormPeriod
  style: FormStyle[]
  religion: FormReligion[]
  description: string
  origin: string
  era: string
  symbolism: string
  palette: {
    bg: string
    fg: string
    accent: string
    border: string
  }
  visualElements: string[]
  suitableFor: string[]
}

/** 文化科普内容 */
export interface CulturalContent {
  id: string
  region: string
  regionLabel: string
  title: string
  philosophy: string
  keyConcepts: string[]
  rituals: string[]
  tombstoneMeaning: string
  funFacts: string[]
  palette: {
    bg: string
    fg: string
    accent: string
    border: string
  }
  relatedFormIds: string[]
}

/** 墓碑符号条目 */
export interface SymbolEntry {
  id: string
  category: 'plant' | 'animal' | 'object' | 'architectural'
  name: string
  nameEn: string
  meaning: string
  commonIn: string
  icon: string
}

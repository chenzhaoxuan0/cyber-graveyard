/**
 * 故事流数据映射
 * 将 CULTURAL_CONTENTS 的地区映射到 TOMBSTONE_FORMS 的文化形式
 */
import { TOMBSTONE_FORMS } from '@/data/tombstone-forms'
import { TEMPLATES } from '@/data/tombstones'
import type { FormCulture, TombstoneForm } from '@/types'

/** 地区（CulturalContent id）→ 墓碑文化形式的文化值列表 */
const CULTURE_TO_FORM_CULTURES: Record<string, FormCulture[]> = {
  'culture-china': ['chinese'],
  'culture-japan': ['japanese'],
  'culture-victorian': ['british'],
  'culture-mexico': ['mexican', 'argentine'],
  'culture-islamic': ['islamic'],
  'culture-africa': ['african'],
  'culture-russia': ['russian'],
  'culture-modern': ['modern', 'chinese', 'japanese', 'american'],
}

/** 按所选地区获取匹配的墓碑文化形式列表 */
export function getFormsForCulture(cultureId: string): TombstoneForm[] {
  const cultures = CULTURE_TO_FORM_CULTURES[cultureId]
  if (!cultures || cultures.length === 0) return TOMBSTONE_FORMS
  const matched = TOMBSTONE_FORMS.filter((f) => f.culture.some((c) => cultures.includes(c)))
  return matched.length > 0 ? matched : TOMBSTONE_FORMS
}

/** 解析画布配色：优先用文化形式 palette，其次用主题模板 palette */
export function getCanvasPalette(formId: string, templateId: string) {
  const DEFAULT = { bg: '#f7f5f0', fg: '#3d3a35', accent: '#8c6d3f', border: '#a8a29e' }
  if (formId) {
    const form = TOMBSTONE_FORMS.find((f) => f.id === formId)
    if (form) return form.palette
  }
  if (templateId) {
    const tpl = TEMPLATES.find((t) => t.id === templateId)
    if (tpl) return tpl.palette
  }
  return DEFAULT
}

/**
 * 全局状态 store
 * - 碑文表单状态（US-04）
 * - DIY 编辑器历史（US-05 撤销/重做，最多 20 步）
 * - 顶部安全条 / 底部援助条可见性
 */
import { create } from 'zustand'
import type { InscriptionForm } from '@/types'

const MAX_HISTORY = 20

/** 计算装饰相关字段签名，用于判断 fabric 叠层是否需要重新生成。
 *  文字内容（epitaph/lifespan/...）现由 DOM 渲染，不再影响 canvas；
 *  仅当装饰列表/文化形式/模板变化时才需重排 fabric 装饰。 */
export function decorationSignature(form: InscriptionForm): string {
  return JSON.stringify([form.decorationIds, form.formId, form.templateId])
}

interface AppState {
  /* —— 碑文表单 —— */
  form: InscriptionForm
  setForm: (patch: Partial<InscriptionForm>) => void
  resetForm: () => void

  /* —— 故事流向导 —— */
  storyStep: number
  setStoryStep: (step: number) => void

  /* —— DIY 编辑器撤销/重做 —— */
  history: string[]
  historyIndex: number
  pushHistory: (snapshot: string) => void
  undo: () => string | null
  redo: () => string | null

  /* —— DIY 编辑器画布状态 —— */
  /** 序列化的 fabric.js JSON，用于离开编辑器后恢复画布 */
  canvasSnapshot: string
  /** 画布的 PNG data URL，供预览页直接展示与导出 */
  canvasPreview: string
  /** 生成 canvasSnapshot 时的装饰签名；若与当前装饰签名不一致，编辑器需重新生成 fabric 装饰 */
  canvasDecorationSignature: string
  setCanvasState: (json: string, preview: string) => void

  /* —— 顶部安全条 / 底部援助条 —— */
  topBarVisible: boolean
  bottomBarVisible: boolean
  setTopBarVisible: (v: boolean) => void
  setBottomBarVisible: (v: boolean) => void
}

const initialForm: InscriptionForm = {
  epitaph: '',
  lifespan: '',
  digitalAssets: [],
  passerbyMessage: '',
  templateId: '',
  regionId: '',
  formId: '',
  decorationIds: [],
}

export const useAppStore = create<AppState>((set, get) => ({
  form: initialForm,
  setForm: (patch) => set((s) => ({ form: { ...s.form, ...patch } })),
  resetForm: () =>
    set({
      form: initialForm,
      history: [],
      historyIndex: -1,
      canvasSnapshot: '',
      canvasPreview: '',
      canvasDecorationSignature: '',
      storyStep: 1,
    }),

  history: [],
  historyIndex: -1,
  pushHistory: (snapshot) =>
    set((s) => {
      const truncated = s.history.slice(0, s.historyIndex + 1)
      const next = [...truncated, snapshot]
      if (next.length > MAX_HISTORY) next.shift()
      return { history: next, historyIndex: next.length - 1 }
    }),
  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex <= 0) return null
    const newIndex = historyIndex - 1
    set({ historyIndex: newIndex })
    return history[newIndex] ?? null
  },
  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex >= history.length - 1) return null
    const newIndex = historyIndex + 1
    set({ historyIndex: newIndex })
    return history[newIndex] ?? null
  },

  canvasSnapshot: '',
  canvasPreview: '',
  canvasDecorationSignature: '',
  setCanvasState: (json, preview) =>
    set((s) => ({
      canvasSnapshot: json,
      canvasPreview: preview,
      canvasDecorationSignature: decorationSignature(s.form),
    })),

  storyStep: 1,
  setStoryStep: (step) => set({ storyStep: step }),

  topBarVisible: true,
  bottomBarVisible: true,
  setTopBarVisible: (v) => set({ topBarVisible: v }),
  setBottomBarVisible: (v) => set({ bottomBarVisible: v }),
}))

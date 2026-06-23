/**
 * 长图导出（US-06）
 * 使用 @zumer/snapdom 将 DOM 元素导出为 1080px 宽 PNG
 */
import { snapdom } from '@zumer/snapdom'

export async function exportLongImage(element: HTMLElement, filename: string): Promise<void> {
  // SnapDOM 配置：宽度 1080px，背景色取元素自身
  const opts = {
    width: 1080,
    scale: 2, // 2x 高清
    backgroundColor: getComputedStyle(element).backgroundColor || '#0a0a0f',
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
    },
  }

  const canvas = await snapdom.toCanvas(element, opts)

  // 转 blob 下载
  await new Promise<void>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('toBlob 返回 null'))
        return
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      resolve()
    }, 'image/png')
  })
}

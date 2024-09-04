import type { Sticker } from '@/types/sticker'

export const stickersService = {
  getAll() {
    const stickers = localStorage.getItem('stickers')
    return stickers ? JSON.parse(stickers) : []
  },
  save(stickers: Sticker[]) {
    localStorage.setItem('stickers', JSON.stringify(stickers))
  }
}

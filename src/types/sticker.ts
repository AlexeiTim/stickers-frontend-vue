export interface Sticker {
  id: number
  content: string
  styles: StickerStyles
}

interface StickerStyles {
  top: string
  left: string
  zIndex: number
  fontSize: string
  color: string
  width: string
  height: string
  backgroundColor: string
}

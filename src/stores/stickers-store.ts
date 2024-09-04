import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Sticker } from '@/types/sticker'
import { stickersService } from '@/services/stickers.service'

export const useStickersStore = defineStore('stickersStore', () => {
  const stickers = ref<Sticker[]>([])

  function getAll() {
    const stickersResponse = stickersService.getAll()
    stickers.value = stickersResponse
  }

  function updatePosition(id: number, position: { top: string; left: string }) {
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1)
      stickers.value[sticker].styles = {
        ...stickers.value[sticker].styles,
        ...position
      }
    stickersService.save(stickers.value)
  }

  function create() {
    const newSticker = {
      id: Date.now(),
      content: 'content',
      styles: {
        fontSize: '16px',
        top: '0px',
        left: '0px',
        zIndex: 1,
        color: '#222',
        height: '200px',
        width: '300px',
        backgroundColor: 'red'
      }
    }
    stickers.value.push(newSticker)
    stickersService.save(stickers.value)
  }

  function setActiveSticker(id: number) {
    stickers.value = stickers.value.map((s) => ({
      ...s,
      styles: {
        ...s.styles,
        zIndex: 1
      }
    }))
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1) {
      stickers.value[sticker].styles.zIndex = 2
      stickersService.save(stickers.value)
    }
  }

  function changeTextColor(id: number) {
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1) {
      const newTextColor = stickers.value[sticker].styles.color === 'red' ? 'blue' : 'red'
      stickers.value[sticker].styles.color = newTextColor
      stickersService.save(stickers.value)
    }
  }

  function changeBgColor(id: number) {
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1) {
      const newBgColor = stickers.value[sticker].styles.backgroundColor === '#543' ? '#123' : '#543'
      stickers.value[sticker].styles.backgroundColor = newBgColor
      stickersService.save(stickers.value)
    }
  }

  function changeFontSize(id: number) {
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1) {
      const newFontSize = stickers.value[sticker].styles.fontSize === '16px' ? '20px' : '16px'
      stickers.value[sticker].styles.fontSize = newFontSize
      stickersService.save(stickers.value)
    }
  }

  function updateSize(id: number, size: { height: string; width: string }) {
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1) {
      stickers.value[sticker].styles.height = size.height
      stickers.value[sticker].styles.width = size.width
      stickersService.save(stickers.value)
    }
  }

  function updateContent(id: number, content: string) {
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1) stickers.value[sticker].content = content
    stickersService.save(stickers.value)
  }

  function remove(id: number) {
    const sticker = stickers.value.findIndex((s) => s.id === id)
    if (sticker !== -1) stickers.value.splice(sticker, 1)
    stickersService.save(stickers.value)
  }

  return {
    stickers,
    updateContent,
    updatePosition,
    create,
    setActiveSticker,
    getAll,
    changeTextColor,
    changeBgColor,
    changeFontSize,
    updateSize,
    remove
  }
})

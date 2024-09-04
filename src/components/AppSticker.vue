<script setup lang="ts">
import { useStickersStore } from '@/stores/stickers-store'
import type { Sticker } from '@/types/sticker'
import { ref, watch } from 'vue'

const props = defineProps<{
  sticker: Sticker
}>()

const stickersStore = useStickersStore()
const styles = ref({ ...props.sticker.styles })

let startX = 0
let startY = 0
let initialTop = 0
let initialLeft = 0
let initialWidth = 0
let initialHeight = 0

function handleDragStart(e: DragEvent) {
  stickersStore.setActiveSticker(props.sticker.id)

  startX = e.clientX
  startY = e.clientY

  initialTop = parseInt(styles.value.top)
  initialLeft = parseInt(styles.value.left)

  const transparentImage = new Image()
  transparentImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  e.dataTransfer?.setDragImage(transparentImage, 0, 0)
}

function handleDrag(e: DragEvent) {
  if (!e.clientX || !e.clientY) return

  const deltaX = e.clientX - startX
  const deltaY = e.clientY - startY

  styles.value.top = initialTop + deltaY + 'px'
  styles.value.left = initialLeft + deltaX + 'px'
}

function handleDragEnd() {
  stickersStore.updatePosition(props.sticker.id, {
    top: styles.value.top,
    left: styles.value.left
  })
}

function handleSetActiveSticker() {
  stickersStore.setActiveSticker(props.sticker.id)
}

watch(
  () => props.sticker.styles,
  (newValue) => {
    styles.value = newValue
  }
)

// Изменение размера
function handleResizeStart(e: MouseEvent) {
  e.preventDefault()
  startX = e.clientX
  startY = e.clientY

  initialWidth = parseInt(styles.value.width)
  initialHeight = parseInt(styles.value.height)

  window.addEventListener('mousemove', handleResizing)
  window.addEventListener('mouseup', handleResizeEnd)
}

function handleResizing(e: MouseEvent) {
  const deltaX = e.clientX - startX
  const deltaY = e.clientY - startY

  styles.value.width = initialWidth + deltaX + 'px'
  styles.value.height = initialHeight + deltaY + 'px'
}

function handleResizeEnd() {
  window.removeEventListener('mousemove', handleResizing)
  window.removeEventListener('mouseup', handleResizeEnd)

  stickersStore.updateSize(props.sticker.id, {
    width: styles.value.width,
    height: styles.value.height
  })
}

function handleInputContent(e: Event) {
  const target = e.target as HTMLTextAreaElement
  stickersStore.updateContent(props.sticker.id, target.value)
}
</script>

<template>
  <div
    class="sticker"
    :style="styles"
    :draggable="true"
    @click="handleSetActiveSticker"
    @drag="handleDrag"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <button @click="stickersStore.changeTextColor(props.sticker.id)">Change Color</button>
    <button @click="stickersStore.changeBgColor(props.sticker.id)">Change BG</button>
    <button @click="stickersStore.changeFontSize(props.sticker.id)">Change font size</button>
    <button @click="stickersStore.remove(props.sticker.id)">Delete</button>
    <textarea
      :value="props.sticker.content"
      @input="handleInputContent"
      :style="{ fontSize: props.sticker.styles.fontSize, color: props.sticker.styles.color }"
    ></textarea>
    <div class="resize" @mousedown="handleResizeStart"></div>
  </div>
</template>

<style scoped>
.sticker {
  position: absolute;
  border: 1px solid black;
  background-color: aqua;
}

.resize {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: black;
  z-index: 3;
  cursor: se-resize;
  width: 10px;
  height: 10px;
}
</style>

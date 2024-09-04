<script setup lang="ts">
import { onBeforeMount } from 'vue'
import AppSticker from './components/AppSticker.vue'
import { useStickersStore } from './stores/stickers-store'
const stickersStore = useStickersStore()

onBeforeMount(() => {
  stickersStore.getAll()
})
</script>

<template>
  <button @click="stickersStore.create">Add sticker</button>
  <AppSticker v-for="sticker in stickersStore.stickers" :key="sticker.id" :sticker="sticker" />
</template>

<style scoped></style>

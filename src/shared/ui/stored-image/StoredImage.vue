<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BASE_SERVER_URL } from '@/shared/config'
import { computed } from 'vue'

const props = defineProps<{
  url?: string
}>()

const imageUrl = computed(() => {
  return `${BASE_SERVER_URL}${props.url}`
})
</script>

<template>
  <img v-if="url !== null" :src="imageUrl" class="w-full h-full object-contain" alt="" />
  <div
    v-if="url === null"
    class="w-full h-full rounded bg-gray-300 flex items-center justify-center text-center text-sm p-4"
  >
    Изображение не найдено
  </div>
</template>

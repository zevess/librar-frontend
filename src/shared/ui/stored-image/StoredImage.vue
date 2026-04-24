<script setup lang="ts">
import { BASE_SERVER_URL } from '@/shared/config'
import { computed } from 'vue'

const props = defineProps<{
  url?: string
  styles?: string
}>()

const imageUrl = computed(() => {
  return `${BASE_SERVER_URL}${props.url}`
})
</script>

<template>
  <div class="h-full rounded">
    <img
      v-if="url !== null"
      :src="imageUrl"
      :class="['w-full h-full object-contain', styles]"
      alt="Обложка"
    />
    <div
      v-if="url === null"
      class="bg-gray-300 h-full flex items-center justify-center text-center text-sm p-4"
    >
      Изображение не найдено
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBook } from '@/entities/book'
import { ActionButton } from '@/shared/ui/action-button'
import { PrimeRating } from '@/shared/ui/rating'
import { StoredImage } from '@/shared/ui/stored-image'
import { computed, inject, ref } from 'vue'

const props = defineProps<{
  book: IBook
  reviewsCount: number
  average?: number
}>()
const rating = computed(() => props.average)

console.log(rating.value)
</script>

<template>
  <div class="flex flex-col w-full max-w-80 md:sticky md:top-2">
    <StoredImage :url="book.image" />
    <div class="flex flex-col mt-4 gap-1">
      <span class="text-gray-500">Доступно</span>
      <ActionButton
        class="w-full h-12"
        :disabled="!book?.isAvailable"
        title="Забронировать"
      ></ActionButton>
    </div>
    <div class="mt-6 flex items-center gap-4">
      <span v-if="rating" class="text-4xl">{{ rating }}</span>
      <PrimeRating v-model="rating" readonly font-size="x-large" />
      <span>{{ reviewsCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBook } from '@/entities/book'
import { bookData } from '@/entities/book/model/book.types'
import { ActionButton } from '@/shared/ui/action-button'
import { PrimeRating } from '@/shared/ui/rating'
import { inject } from 'vue'

defineProps<{
  book: IBook
  reviewsCount: number
}>()
const rating = inject('rating')
</script>

<template>
  <div class="flex flex-col w-full max-w-80 md:sticky md:top-2">
    <img
      :src="book?.image ?? bookData[0]?.image"
      class="w-full h-full object-contain rounded"
      alt=""
    />

    <div class="flex flex-col mt-4 gap-1">
      <span class="text-gray-500">Доступно</span>
      <ActionButton
        class="w-full h-12"
        :disabled="!book?.isAvailable"
        title="Забронировать"
      ></ActionButton>
    </div>
    <div class="mt-6 flex items-center gap-4">
      <span class="text-4xl">{{ rating }}</span>
      <PrimeRating v-model="rating" readonly font-size="x-large" />
      <span>{{ reviewsCount }}</span>
    </div>
  </div>
</template>

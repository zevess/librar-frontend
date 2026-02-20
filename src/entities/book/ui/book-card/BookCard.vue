<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { type IBook } from '../../model/book.types'

// defineProps({
//   title: String,
//   isAwailable: Boolean,
//   image: String,
//   author: String,
// })
defineProps<{
  book: IBook
}>()
</script>

<template>
  <div
    class="flex flex-col items-center w-32 md:w-48 p-2 rounded-md border-4 border-transparent hover:border-[#bededc] cursor-pointer transition hover:-translate-y-2"
  >
    <div class="rounded w-full object-contain">
      <img :src="book.image" alt="" />
    </div>
    <div class="flex flex-col gap-1 w-full">
      <span :title="book.title" class="mt-2 text-base/tight line-clamp-2">{{ book.title }}</span>
      <span class="text-xs text-gray-500">{{ book.author }}</span>
      <ActionButton
        :disabled="!book.isAvailable"
        :title="book.isAvailable ? 'Забронировать' : 'Забронировано'"
      />
    </div>
  </div>
</template>

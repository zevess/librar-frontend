<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { RouterLink } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config/url.config'
import type { IBook } from '../model/book.types'

defineProps<{
  book: IBook
  isEditable: boolean
  isReservable: boolean
}>()
</script>

<template>
  <div
    class="flex flex-col gap-2 w-36 sm:w-48 p-2 rounded-md border-4 border-transparent hover:border-[#bededc] cursor-pointer transition hover:-translate-y-2"
  >
    <RouterLink :to="PUBLIC_URL.book(book.slug)"
      ><div class="w-full aspect-2/3 overflow-hidden rounded">
        <img :src="book.image" class="w-full h-full object-contain" alt="" />
      </div>
      <div class="flex flex-col gap-1 w-full">
        <span :title="book.title" class="mt-2 text-base/tight line-clamp-2">{{ book.title }}</span>
        <span class="text-xs text-gray-500">{{ book.author }}</span>
      </div>
    </RouterLink>

    <ActionButton
      v-if="isReservable"
      :disabled="!book.isAvailable"
      :title="book.isAvailable ? 'Забронировать' : 'Забронировано'"
      class="w-full text-xs"
    />
  </div>
</template>

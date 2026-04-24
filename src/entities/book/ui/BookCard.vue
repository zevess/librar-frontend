<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { type IBook } from '../model/book.types'
import { StoredImage } from '@/shared/ui/stored-image'
import { computed, ref } from 'vue'
import { ReserveButton } from '@/features/reserve-button'

const props = defineProps<{
  book: IBook
  isEditable: boolean
}>()

const isAvailable = computed(() => props.book.isAvailable)
</script>

<template>
  <div
    class="flex flex-col gap-2 w-36 sm:w-48 p-2 rounded-md border-4 border-transparent hover:border-[#bededc] cursor-pointer transition hover:-translate-y-2"
  >
    <RouterLink :to="PUBLIC_URL.book(`${book.slug}-${book.id}`)"
      ><div class="w-full aspect-2/3 overflow-hidden rounded">
        <StoredImage :url="book.image" />
      </div>
      <div class="flex flex-col gap-1 w-full">
        <span :title="book.title" class="mt-2 text-base/tight line-clamp-2">{{ book.title }}</span>
        <span v-if="book.author" class="text-xs text-gray-500">{{ book.author.name }}</span>
      </div>
    </RouterLink>

    <ReserveButton :book-id="String(book.id)" :is-available="isAvailable" />
  </div>
</template>

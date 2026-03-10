<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { RouterLink } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { bookData, type IBook } from '../model/book.types'
import { useQueryClient } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import { StoredImage } from '@/shared/ui/stored-image'

const props = defineProps<{
  book: IBook
  isEditable: boolean
  isReservable: boolean
}>()

const slug = `${props.book.slug}-${props.book.id}`

const queryClient = useQueryClient()
const prefetchBook = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['get book', slug],
    queryFn: () => bookService.getBookBySlug(slug),
  })
}
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
        <span class="text-xs text-gray-500">{{ book.author.name }}</span>
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

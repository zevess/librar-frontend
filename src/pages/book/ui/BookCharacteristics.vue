<script setup lang="ts">
import type { IBook } from '@/entities/book'
import { PUBLIC_URL } from '@/shared/config'
import { computed } from 'vue'

const props = defineProps<{
  book: IBook
}>()

const genres = computed(() => {
  return props.book.genres.data
})

//w-full gap-4 grid grid-cols-1 lg:grid-cols-2 justify-between
</script>

<template>
  <ul class="w-full gap-4 grid grid-cols-1 lg:grid-cols-2">
    <li class="flex gap-9">
      <span class="text-gray-700 min-w-36">Автор:</span>
      <RouterLink
        v-if="book.author"
        class="hover:underline items-start"
        :to="PUBLIC_URL.author(`${book.author.slug}-${book.author.id}`)"
        >{{ book.author.name }}</RouterLink
      >
      <span v-if="!book.author?.name" class="text-gray-500 items-start">не указан</span>
    </li>
    <li class="flex gap-9">
      <span class="text-gray-700 min-w-36">Издательство:</span>
      <RouterLink
        class="hover:underline items-start"
        :to="PUBLIC_URL.publisher(`${book.publisher.slug}-${book.publisher.id}`)"
        >{{ book.publisher.name }}</RouterLink
      >
    </li>
    <li class="flex gap-9">
      <span class="text-gray-700 min-w-36">Категория:</span>
      <span class="items-start">{{ book.category.name }}</span>
    </li>
    <li class="flex gap-9">
      <span class="text-gray-700 min-w-36">Жанры:</span>
      <div class="flex flex-wrap gap-2 items-start">
        <span v-for="genre in genres" class="bg-[#d1ebe9] p-1 px-2">{{ genre.name }}</span>
      </div>
    </li>
  </ul>
</template>

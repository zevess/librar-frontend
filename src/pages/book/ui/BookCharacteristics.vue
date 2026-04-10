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
</script>

<template>
  <ul class="w-full gap-4 grid grid-cols-1 lg:grid-cols-2 justify-between">
    <li v-if="book" class="flex gap-8">
      <span class="text-gray-700 w-30">Автор:</span>
      <RouterLink
        v-if="book.author"
        class="hover:underline"
        :to="PUBLIC_URL.author(`${book.author.slug}-${book.author.id}`)"
        >{{ book.author.name }}</RouterLink
      >
    </li>
    <li class="flex gap-8">
      <span class="text-gray-700 w-30">Издательство:</span>
      <RouterLink
        class="hover:underline"
        :to="PUBLIC_URL.publisher(`${book.publisher.slug}-${book.publisher.id}`)"
        >{{ book.publisher.name }}</RouterLink
      >
    </li>
    <li class="flex gap-8">
      <span class="text-gray-700 w-30">Категория:</span>
      <span>{{ book.category.name }}</span>
    </li>
    <li class="flex gap-8">
      <span class="text-gray-700 w-30">Жанры:</span>
      <div class="flex flex-wrap gap-2">
        <span v-for="genre in genres" class="bg-[#d1ebe9] p-1 px-2">{{ genre.name }}</span>
      </div>
    </li>
  </ul>
</template>

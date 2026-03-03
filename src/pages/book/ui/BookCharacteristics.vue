<script setup lang="ts">
import type { IBook } from '@/entities/book'
import { PUBLIC_URL } from '@/shared/config'

defineProps<{
  book: IBook
}>()
</script>

<template>
  <ul class="w-full gap-4 grid grid-cols-1 lg:grid-cols-2 justify-between">
    <li v-if="book" class="flex gap-8">
      <span class="text-gray-700 w-30">Автор:</span>
      <RouterLink :to="PUBLIC_URL.author(`${book.author.slug}-${book.author.id}`)">{{
        book.author.name
      }}</RouterLink>
    </li>
    <li class="flex gap-8">
      <span class="text-gray-700 w-30">Издательство:</span>
      <RouterLink :to="PUBLIC_URL.publisher(`${book.publisher.slug}-${book.publisher.id}`)">{{
        book.publisher.name
      }}</RouterLink>
    </li>
    <li class="flex gap-8">
      <span class="text-gray-700 w-30">Категория:</span>
      <span>{{ book.category.name }}</span>
    </li>
    <li class="flex gap-8">
      <span class="text-gray-700 w-30">Жанры:</span>
      <div class="flex flex-wrap gap-2">
        <span v-for="genre in book.genres.data" class="bg-[#d1ebe9] p-1 px-2">{{
          genre.name
        }}</span>
      </div>
    </li>
  </ul>
</template>

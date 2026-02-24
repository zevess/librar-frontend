<script setup lang="ts">
import { authorData, type IAuthor } from '@/entities/author/model/author.types'
import { bookData } from '@/entities/book/model/book.types'
import { BookList } from '@/entities/book/ui/book-list'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
// defineProps<IAuthor>()
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle :title="authorData.name" class="text-center md:text-left mb-2" />
      <PageSubtitle title="автор" />
    </div>
    <p>{{ authorData.description }}</p>
    <BookList :items="bookData" variant="default" />
  </div>
</template>

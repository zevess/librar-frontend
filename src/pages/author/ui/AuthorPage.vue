<script setup lang="ts">
import { BookList, BookCard, BookListSkeleton } from '@/entities/book'
import { useGetParams } from '@/shared/lib'
import { useGetAuthor } from '@/entities/author'
import { NotFound } from '@/shared/ui/not-found'
import AuthorHeader from './AuthorHeader.vue'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
import { computed, watch, watchEffect } from 'vue'
const { slug } = useGetParams()
const { author, isFetching, isFetched } = useGetAuthor(slug)
watchEffect(() => {
  const title = author.value?.data?.name
  document.title = title ?? 'Загрузка...'
})
</script>

<template>
  <PageSkeleton variant="author" v-if="isFetching" />
  <NotFound v-if="!author?.success && isFetched"> Автор на найден </NotFound>
  <div v-if="author?.success" class="flex flex-col gap-4 w-full">
    <AuthorHeader :author="author.data" />
    <p>{{ author?.data.description }}</p>
    <BookList :items="author?.data.books.data" v-if="author.data.books" variant="default" />
  </div>
</template>

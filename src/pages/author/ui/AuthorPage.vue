<script setup lang="ts">
import { BookList } from '@/entities/book'
import { useGetParams } from '@/shared/lib'
import { useGetAuthor } from '@/entities/author'
import { Message } from '@/shared/ui/message'
import AuthorHeader from './AuthorHeader.vue'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
import { watchEffect } from 'vue'
const { slug } = useGetParams()
const { author, isFetching, isFetched } = useGetAuthor(slug)
watchEffect(() => {
  const title = author.value?.data?.name
  document.title = title ?? 'Загрузка...'
})
</script>

<template>
  <PageSkeleton variant="author" v-if="isFetching" />
  <Message v-if="!author?.success && isFetched"> Автор на найден </Message>
  <div v-if="author?.success" class="flex flex-col gap-4 w-full">
    <AuthorHeader :author="author.data" />
    <p>{{ author?.data.description }}</p>
    <BookList :items="author?.data.books" v-if="author.data.books" variant="default" />
  </div>
</template>

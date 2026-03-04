<script setup lang="ts">
import { authorData, type IAuthor } from '@/entities/author/model/author.types'
import { bookData } from '@/entities/book/model/book.types'
import { BookList, BookCard, BookListSkeleton } from '@/entities/book'

import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { SettingButton } from '@/shared/ui/setting-button'
import { useGetParams } from '@/shared/lib'
import { useGetAuthor } from '@/entities/author'
import { NotFound } from '@/shared/ui/not-found'
import { Skeleton } from 'primevue'
import AuthorSkeleton from './AuthorSkeleton.vue'
import AuthorHeader from './AuthorHeader.vue'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
// defineProps<IAuthor>()
const { slug } = useGetParams()
const { author, isFetching, isFetched } = useGetAuthor(slug)
</script>

<template>
  <PageSkeleton variant="author" v-if="isFetching" />
  <NotFound v-if="!author?.success && isFetched"> Автор на найден </NotFound>
  <div v-if="author?.success" class="flex flex-col gap-4 w-full">
    <AuthorHeader :author="author.data" />
    <p>{{ author?.data.description }}</p>
    <BookList
      :is-reservable="true"
      :items="author?.data.books.data"
      v-if="author.data.books"
      variant="default"
    />
  </div>
</template>

<script setup lang="ts">
import { BookList, BookListSkeleton } from '@/entities/book'
import { PUBLIC_URL } from '@/shared/config'
import { ActionButton } from '@/shared/ui/action-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'
import { useBookSections } from '../api/useBookSections'

const { books, isBooksPending } = useBookSections()
</script>

<template>
  <PageTitle title="новые поступления" />
  <BookList v-if="!isBooksPending" variant="default" :items="books?.data ?? []" />
  <BookListSkeleton variant="default" v-if="isBooksPending" />
  <RouterLink :to="PUBLIC_URL.catalog()" class="mx-auto flex items-center w-fit">
    <ActionButton class="h-12 px-4" title="смотреть больше" />
  </RouterLink>
</template>

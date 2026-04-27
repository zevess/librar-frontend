<script setup lang="ts">
import { BookList, BookListSkeleton, type IBooksParams } from '@/entities/book'
import { PUBLIC_URL } from '@/shared/config'
import { ActionButton } from '@/shared/ui/action-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'
import { useBookSections } from '../api/useBookSections'
import { computed } from 'vue'

const props = defineProps<{
  categoryId: number
  title: string
}>()

const params = computed<IBooksParams>(() => ({
  category: props.categoryId,
}))

const { books, isBooksPending } = useBookSections(params)
</script>

<template>
  <div v-if="books?.meta.total || isBooksPending">
    <PageTitle :title="title" />
    <BookList v-if="!isBooksPending" variant="default" :items="books?.data ?? []" />
    <BookListSkeleton variant="default" v-if="isBooksPending" />
    <RouterLink
      :to="PUBLIC_URL.catalog(`?category=${categoryId}`)"
      class="mx-auto flex items-center w-fit"
    >
      <ActionButton class="h-12 px-4" title="смотреть больше" />
    </RouterLink>
  </div>
</template>

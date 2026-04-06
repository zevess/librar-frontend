<script setup lang="ts">
import { BookList, BookListSkeleton, useGetBooks } from '@/entities/book'
import { PUBLIC_URL } from '@/shared/config'
import { ActionButton } from '@/shared/ui/action-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'

const { books, isFetching } = useGetBooks({
  sort: 'created_at',
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="новые поступления" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti nulla dolor quod
      obcaecati voluptas mollitia cum ipsa? Sunt eveniet dolore iusto minus magnam sed sequi
      corrupti tempora omnis veritatis!
    </p>
    <BookList v-if="!isFetching" variant="default" :items="books?.data ?? []" />
    <BookListSkeleton variant="default" v-if="isFetching" />
    <RouterLink :to="PUBLIC_URL.catalog()" class="mx-auto flex items-center w-fit">
      <ActionButton class="h-12 px-4" title="смотреть больше" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
// import { bookData } from '@/entities/book/model/book.types'
import { BookCardSkeleton, BookList, BookListSkeleton, useGetBooks } from '@/entities/book'

import { bookService } from '@/entities/book/model/book.service'
import { PUBLIC_URL } from '@/shared/config'

import { ActionButton } from '@/shared/ui/action-button'
import { PrimeCarousel } from '@/shared/ui/carousel'
import { PageTitle } from '@/shared/ui/page-title'
import { useQuery } from '@tanstack/vue-query'
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'

const { books, isLoading } = useGetBooks()
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="новые поступления" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti nulla dolor quod
      obcaecati voluptas mollitia cum ipsa? Sunt eveniet dolore iusto minus magnam sed sequi
      corrupti tempora omnis veritatis!
    </p>
    <BookList
      v-if="!isLoading"
      :is-reservable="true"
      variant="default"
      :items="books?.data ?? []"
    />
    <BookListSkeleton variant="default" v-if="isLoading" />
    <RouterLink :to="PUBLIC_URL.catalog()" class="mx-auto flex items-center w-fit">
      <ActionButton class="h-12 px-4" title="смотреть больше" />
    </RouterLink>
  </div>
</template>

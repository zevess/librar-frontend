<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList, BookListSkeleton } from '@/entities/book'
import { PrimeDrawer } from '@/shared/ui/drawer'
import { PageTitle } from '@/shared/ui/page-title'
import { computed, nextTick, provide, ref, watch } from 'vue'
import { CatalogFilter } from '@/features/catalog-filter'
import { useGetBooks } from '@/entities/book/api/useGetBooks'
import { convertArrayQuery } from '@/shared/lib'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@/shared/ui/message'
import { Pagination } from '@/features/pagination'
import { useCatalogFilter } from '../lib/useCatalogFilter'

const { params, category, publishers, q, genres, status } = useCatalogFilter()

const { books, isFetching } = useGetBooks(params)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center justify-between">
      <PageTitle title="каталог" />
      <div class="block lg:hidden">
        <PrimeDrawer
          show-results
          :results-count="books?.meta.total"
          filled
          drawer-name="Фильтрация"
          icon="filter"
        >
          <CatalogFilter
            v-model:category-filter="category"
            v-model:genre-filter="genres"
            v-model:publisher-filter="publishers"
            v-model:status-filter="status"
          />
        </PrimeDrawer>
      </div>
    </div>

    <div class="flex flex-row justify-center lg:justify-between">
      <div class="hidden lg:block w-full max-w-60">
        <CatalogFilter
          v-model:category-filter="category"
          v-model:genre-filter="genres"
          v-model:publisher-filter="publishers"
          v-model:status-filter="status"
        />
      </div>

      <Message v-if="books?.data.length === 0"> Ничего не найдено. Попробуйте позже </Message>
      <BookList v-if="!isFetching && books?.data" variant="catalog" :items="books?.data" />
      <BookListSkeleton variant="catalog" v-if="isFetching" />
    </div>

    <Pagination v-if="books?.links || books?.meta" :meta="books?.meta" :links="books?.links" />
  </div>
</template>

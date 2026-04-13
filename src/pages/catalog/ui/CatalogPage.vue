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

const route = useRoute()
const router = useRouter()

const { filter } = useCatalogFilter(route.query)
let isSyncing = false
watch(
  () => ({
    q: filter.value.q,
    category: filter.value.category,
    genres: filter.value.genres,
    publishers: filter.value.publishers,
    status: filter.value.status,
  }),
  () => {
    if (isSyncing) return
    const newFilters = { ...filter.value }
    newFilters.page = 1
    router.push({ query: newFilters })
  },
)

watch(
  () => route.query,
  () => {
    isSyncing = true
    console.log(route.query)
    filter.value.page = Number(route.query.page)
    filter.value.q = route.query.q ? String(route.query.q) : ''
    filter.value.status = route.query.status ? String(route.query.status) : ''
    filter.value.category = route.query.category ? Number(route.query.category) : null
    filter.value.genres = route.query.genres ? convertArrayQuery(route.query.genres) : []
    filter.value.publishers = route.query.publishers
      ? convertArrayQuery(route.query.publishers)
      : []
    nextTick(() => {
      isSyncing = false
    })
  },
)

const { books, isFetching } = useGetBooks(filter.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center justify-between">
      <PageTitle title="каталог" />
      <div class="block lg:hidden">
        <PrimeDrawer filled drawer-name="Фильтрация" icon="filter">
          <CatalogFilter
            v-model:category-filter="filter.category"
            v-model:genre-filter="filter.genres"
            v-model:publisher-filter="filter.publishers"
            v-model:status-filter="filter.status"
          />
        </PrimeDrawer>
      </div>
    </div>

    <div class="flex flex-row justify-center lg:justify-between">
      <div class="hidden lg:block w-full max-w-60">
        <CatalogFilter
          v-model:category-filter="filter.category"
          v-model:genre-filter="filter.genres"
          v-model:publisher-filter="filter.publishers"
          v-model:status-filter="filter.status"
        />
      </div>

      <Message v-if="books?.data.length === 0"> Ничего не найдено. Попробуйте позже </Message>
      <BookList v-if="!isFetching && books?.data" variant="catalog" :items="books?.data" />
      <BookListSkeleton variant="catalog" v-if="isFetching" />
    </div>

    <Pagination v-if="books?.links || books?.meta" :meta="books?.meta" :links="books?.links" />
  </div>
</template>

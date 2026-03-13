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
import { NotFound } from '@/shared/ui/not-found'
import { Paginator } from 'primevue'
import { Pagination } from '@/features/pagination'

const route = useRoute()
const router = useRouter()

const filters = ref({
  q: route.query.q ? String(route.query.q) : '',
  category: route.query.category ? Number(route.query.category) : null,
  genres: convertArrayQuery(route.query.genres) ?? [],
  publishers: convertArrayQuery(route.query.publishers) ?? null,
  page: route.query.page ? Number(route.query.page) : 1,
})

watch(
  () => ({
    q: filters.value.q,
    category: filters.value.category,
    genres: filters.value.genres,
    publishers: filters.value.publishers,
  }),
  () => {
    const newFilters = { ...filters.value }
    newFilters.page = 1
    router.push({ query: newFilters })
  },
)

watch(
  () => route.query,
  () => {
    filters.value.q = String(route.query.q)
    filters.value.page = Number(route.query.page)
  },
)

const { books, isLoading } = useGetBooks(filters.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center justify-between">
      <PageTitle title="каталог" />
      <div class="block lg:hidden">
        <PrimeDrawer drawer-name="Фильтрация" icon="filter">
          <CatalogFilter
            v-model:category-filter="filters.category"
            v-model:genre-filter="filters.genres"
            v-model:publisher-filter="filters.publishers"
          />
        </PrimeDrawer>
      </div>
    </div>

    <div class="flex flex-row justify-center lg:justify-between">
      <div class="hidden lg:block w-full max-w-60">
        <CatalogFilter
          v-model:category-filter="filters.category"
          v-model:genre-filter="filters.genres"
          v-model:publisher-filter="filters.publishers"
        />
      </div>

      <NotFound v-if="books?.data.length === 0"> Ничего не найдено. Попробуйте позже </NotFound>
      <BookList
        v-if="!isLoading && books?.data"
        :is-reservable="true"
        variant="catalog"
        :items="books?.data"
      />
      <BookListSkeleton variant="catalog" v-if="isLoading" />
    </div>

    <Pagination v-if="books?.links || books?.meta" :meta="books?.meta" :links="books?.links" />
  </div>
</template>

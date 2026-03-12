<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList, BookListSkeleton } from '@/entities/book'
import { PrimeDrawer } from '@/shared/ui/drawer'
import { PageTitle } from '@/shared/ui/page-title'
import { computed, provide, ref, watch } from 'vue'
import { CatalogFilter } from '@/features/catalog-filter'
import { useGetBooks } from '@/entities/book/api/useGetBooks'
import { convertArrayQuery } from '@/shared/lib'
import { useRoute, useRouter } from 'vue-router'
import { NotFound } from '@/shared/ui/not-found'
import { Paginator } from 'primevue'

const route = useRoute()
const router = useRouter()
const page = ref(0)

const filters = ref({
  q: route.query.q ? String(route.query.q) : '',
  category: route.query.category ? Number(route.query.category) : null,
  genres: convertArrayQuery(route.query.genres) ?? [],
  publishers: convertArrayQuery(route.query.publishers) ?? null,
  page: route.query.page ? Number(route.query.page) : 1,
})

const handleSetFilters = () => {
  router.push({
    query: filters.value,
  })
}

watch([filters.value, () => route.query.q], () => {
  filters.value.q = route.query.q ? String(route.query.q) : ''
  router.push({
    query: filters.value,
  })
})

const paginatorFirst = computed({
  get: () => {
    return filters.value.page - 1
  },
  set: (first: number) => {
    filters.value.page = Math.floor(first / Number(books.value?.meta.per_page)) + 1
  },
})

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
            @apply="handleSetFilters"
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
          @apply="handleSetFilters"
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
    <Paginator
      v-model:first="paginatorFirst"
      :rows="books?.meta.per_page"
      :total-records="books?.meta.total"
    ></Paginator>
  </div>
</template>

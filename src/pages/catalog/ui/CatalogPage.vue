<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList, BookListSkeleton } from '@/entities/book'
import { PrimeDrawer } from '@/shared/ui/drawer'
import { PageTitle } from '@/shared/ui/page-title'
import { provide, ref, watch } from 'vue'
import { CatalogFilter } from '@/features/catalog-filter'
import { useGetBooks } from '@/entities/book/api/useGetBooks'
import { convertArrayQuery } from '@/shared/lib'
import { useRoute, useRouter } from 'vue-router'
import { useGetCategories } from '@/entities/category'
import { useGetGenres } from '@/entities/genre'
import { useGetPublishers } from '@/entities/publisher'
import { useQueryClient } from '@tanstack/vue-query'

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()

const filters = ref({
  q: route.query.q ? String(route.query.q) : '',
  category: convertArrayQuery(route.query.category) ?? [],
  genres: convertArrayQuery(route.query.genres) ?? [],
  publishers: convertArrayQuery(route.query.publishers) ?? null,
})

const handleSetFilters = () => {
  router.push({
    query: filters.value,
  })
}

watch(
  () => route.query.q,
  () => {
    filters.value.q = route.query.q ? String(route.query.q) : ''
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

      <BookList
        v-if="!isLoading"
        :is-reservable="true"
        variant="catalog"
        :items="books?.data ?? []"
      />
      <BookListSkeleton variant="catalog" v-if="isLoading" />
    </div>
  </div>
</template>

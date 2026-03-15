<script setup lang="ts">
import { BookList, BookTable, useGetBooks } from '@/entities/book'
import type { IGenre } from '@/entities/genre'
import { BookFilter } from '@/features/book-filter'
import { Pagination } from '@/features/pagination'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { convertArrayQuery } from '@/shared/lib'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { Paginator } from 'primevue'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useParams } from './lib/useParams'
import { useBookFilter } from './lib/useBookFilter'

const route = useRoute()
const router = useRouter()

const { bookFilter } = useBookFilter()

const { params } = useParams()

const apply = () => {
  const newFilters = { ...bookFilter.value }
  newFilters.page = 1
  router.push({ query: newFilters })
}

watch(
  () => route.query,
  () => {
    params.value.q = route.query.q ? String(route.query.q) : ''
    params.value.bookId = route.query.bookId ? String(route.query.bookId) : ''
    params.value.page = Number(route.query.page)
    params.value.category = route.query.category ? Number(route.query.category) : null
    params.value.genres = route.query.genres ? convertArrayQuery(route.query.genres) : []
    params.value.publishers = route.query.publishers
      ? convertArrayQuery(route.query.publishers)
      : []
  },
)

const { books } = useGetBooks(params.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="книги" />
    <BookFilter
      @apply="apply"
      v-model:book-id-filter="bookFilter.bookId"
      v-model:query-filter="bookFilter.q"
      v-model:genres-filter="bookFilter.genres"
      v-model:category-filter="bookFilter.category"
      v-model:publishers-filter="bookFilter.publishers"
    />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <ActionButton @click="apply" class="p-4" title="Применить"></ActionButton>

      <LinkButton :to="PUBLIC_URL.adminBookCreate()" text="Добавить книгу" />
    </div>

    <BookTable v-if="books?.data" :books="books?.data" />
    <NotFound v-if="books?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</NotFound
    >
    <Pagination v-if="books" :meta="books?.meta" :links="books?.links" />
  </div>
</template>

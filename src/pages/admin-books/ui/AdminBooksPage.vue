<script setup lang="ts">
import { BookList, BookTable, useGetBooks } from '@/entities/book'
import type { IGenre } from '@/entities/genre'
import { BookFilter } from '@/features/book-filter'
import { ApplyButton, applyFilter, ClearButton, useFilter, useParams } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { convertArrayQuery } from '@/shared/lib'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { Paginator } from 'primevue'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()

const { filter } = useFilter()
const { params } = useParams()

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

const { books, isFetched, isFetching } = useGetBooks(params.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="книги" />
    <BookFilter
      v-model:book-id-filter="filter.bookId"
      v-model:query-filter="filter.q"
      v-model:genres-filter="filter.genres"
      v-model:category-filter="filter.category"
      v-model:publishers-filter="filter.publishers"
    />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex gap-4">
        <ApplyButton :filter="filter" />
        <ClearButton />
      </div>
      <LinkButton :to="PUBLIC_URL.adminBookCreate()" text="Добавить книгу" />
    </div>
    <SkeletonTable :cols="6" v-if="isFetching && !books" />

    <BookTable v-if="books?.data" :books="books?.data" />
    <NotFound v-if="books?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</NotFound
    >
    <Pagination v-if="books" :meta="books?.meta" :links="books?.links" />
  </div>
</template>

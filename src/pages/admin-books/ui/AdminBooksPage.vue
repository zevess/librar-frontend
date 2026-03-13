<script setup lang="ts">
import { BookList, BookTable, useGetBooks } from '@/entities/book'
import { BookFilter } from '@/features/book-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { Paginator } from 'primevue'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const bookFilter = ref({
  q: route.query.q ? String(route.query.q) : '',
  bookId: route.query.category ? String(route.query.bookId) : null,
  page: route.query.page ? Number(route.query.page) : 1,
})

const params = ref({
  q: route.query.q ? String(route.query.q) : '',
  bookId: route.query.category ? String(route.query.bookId) : null,
  page: route.query.page ? Number(route.query.page) : 1,
})

const apply = () => {
  router.push({
    query: {
      ...bookFilter.value,
      page: 1,
    },
  })
}

watch([params.value, () => route.query], () => {
  params.value.q = route.query.q ? String(route.query.q) : ''
  router.push({
    query: { ...params.value },
  })
  // params.value.page = route.query.page ? Number(route.query.page) : 1
})

const paginatorFirst = computed({
  get: () => {
    return params.value.page - 1
  },
  set: (first: number) => {
    params.value.page = Math.floor(first / Number(books.value?.meta.per_page)) + 1
  },
})

const { books } = useGetBooks(params.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="книги" />
    <BookFilter
      @apply="apply"
      v-model:book-id-filter="bookFilter.bookId"
      v-model:query-filter="bookFilter.q"
    />
    <div class="flex justify-center md:justify-end">
      <LinkButton :to="PUBLIC_URL.adminBookCreate()" text="Добавить книгу" />
    </div>
    <BookTable v-if="books?.data" :books="books?.data" />
    <Paginator
      v-model:first="paginatorFirst"
      :rows="books?.meta.per_page"
      :total-records="books?.meta.total"
    ></Paginator>
  </div>
</template>

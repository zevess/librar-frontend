<script setup lang="ts">
import { BookList, BookTable, useGetBooks } from '@/entities/book'
import { bookData } from '@/entities/book/model/book.types'
import AdminBookCard from '@/entities/book/ui/AdminBookCard.vue'
import { BookFilter } from '@/features/book-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { Paginator } from 'primevue'
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const bookFilter = ref({
  q: route.query.q ? String(route.query.q) : '',
  bookId: route.query.category ? String(route.query.bookId) : null,

  page: route.query.page ? Number(route.query.page) : 1,
})

const filters = computed(() => {
  return bookFilter.value
})

const apply = () => {
  console.log(filters.value)
}

const { books } = useGetBooks(filters.value)
// const paginatorFirst = computed({
//   get: () => {
//     return filters.value.page - 1
//   },
//   set: (first: number) => {
//     filters.value.page = Math.floor(first / Number(books.value?.meta.per_page)) + 1
//   },
// })
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
    <!-- <Paginator
      v-model:first="paginatorFirst"
      :rows="books?.meta.per_page"
      :total-records="books?.meta.total"
    ></Paginator> -->
  </div>
</template>

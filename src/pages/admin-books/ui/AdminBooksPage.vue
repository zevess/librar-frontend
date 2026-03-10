<script setup lang="ts">
import { BookList, BookTable, useGetBooks } from '@/entities/book'
import { bookData } from '@/entities/book/model/book.types'
import AdminBookCard from '@/entities/book/ui/AdminBookCard.vue'
import { BookFilter } from '@/features/book-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'

const { books } = useGetBooks()
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="книги" />
    <BookFilter />
    <div class="flex justify-center md:justify-end">
      <LinkButton :to="PUBLIC_URL.adminBookCreate()" text="Добавить книгу" />
    </div>
    <BookTable v-if="books?.data" :books="books?.data" />
    <!-- <BookList :is-reservable="false" :items="bookData" variant="default" /> -->
  </div>
</template>

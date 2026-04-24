<script setup lang="ts">
import { BookTable, useGetAdminBooks } from '@/entities/book'
import { BookFilter } from '@/features/book-filter'
import { useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'

const { q, id, publishers, genres, category, params, applyFilter, clearFilter } = useFilter()

const { books, isFetched, isFetching } = useGetAdminBooks(params)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="книги" />
    <ConfirmDialog />
    <BookFilter
      v-model:book-id-filter="id"
      v-model:query-filter="q"
      v-model:genres-filter="genres"
      v-model:category-filter="category"
      v-model:publishers-filter="publishers"
    />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ActionButton class="p-4" @click="clearFilter">Сбросить</ActionButton>
        <ActionButton class="p-4" @click="applyFilter">Применить</ActionButton>
      </div>

      <LinkButton :to="PUBLIC_URL.adminBookCreate()" text="Добавить книгу" />
    </div>
    <SkeletonTable :cols="6" v-if="isFetching && !books" />

    <BookTable v-if="books?.data" :books="books?.data" />
    <Message v-if="books?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</Message
    >
    <Pagination v-if="books" :meta="books?.meta" :links="books?.links" />
  </div>
</template>

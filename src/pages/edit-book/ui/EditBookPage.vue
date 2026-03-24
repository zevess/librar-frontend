<script setup lang="ts">
import { useGetBook } from '@/entities/book'
import { BookForm } from '@/features/book-form'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { ConfirmDialog, Toast } from 'primevue'
import { computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { book, isFetched } = useGetBook(String(route.params.bookSlug))
watchEffect(() => {
  const title = book.value?.data?.title
  document.title = title ? 'Изменить ' + title : 'Загрузка...'
})
</script>

<template>
  <PageTitle title="изменить книгу" />
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <BookForm mode="edit" v-if="book?.data" :book="book.data"></BookForm>
  <NotFound v-if="!book?.success && isFetched">Книга не найдена</NotFound>
</template>

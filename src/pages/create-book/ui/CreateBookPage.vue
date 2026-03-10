<script setup lang="ts">
import { BookForm } from '@/features/book-form'
import { PageTitle } from '@/shared/ui/page-title'
import { Toast } from 'primevue'
</script>

<template>
  <PageTitle title="создать книгу" />
  <Toast />
  <BookForm mode="create"></BookForm>
</template>

<script setup lang="ts">
import { CategoriesTable } from '@/entities/category'
import { GenresTable, useGetGenres } from '@/entities/genre'
import { AuthorFilter } from '@/features/author-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { ConfirmDialog, Toast } from 'primevue'
import { RouterLink } from 'vue-router'

const { genres } = useGetGenres()
</script>

<template>
  <PageTitle title="жанры" />
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="flex justify-center md:justify-end">
    <LinkButton :to="PUBLIC_URL.adminGenreCreate()" text="Добавить жанр" />
  </div>
  <GenresTable v-if="genres?.data" :genres="genres.data" />
</template>

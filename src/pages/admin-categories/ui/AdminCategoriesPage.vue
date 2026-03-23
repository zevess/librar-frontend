<script setup lang="ts">
import { CategoriesTable, useGetCategories } from '@/entities/category'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog, Toast } from 'primevue'

const { categories, isFetching } = useGetCategories()
</script>

<template>
  <PageTitle title="категории" />
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="flex justify-center md:justify-end">
    <LinkButton :to="PUBLIC_URL.adminCategoryCreate()" text="Добавить категорию" />
  </div>
  <SkeletonTable :cols="2" v-if="isFetching && !categories" />

  <CategoriesTable v-if="categories" :categories="categories?.data" />
</template>

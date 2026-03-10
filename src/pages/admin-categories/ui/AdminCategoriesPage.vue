<script setup lang="ts">
import { CategoriesTable, useGetCategories } from '@/entities/category'
import { AuthorFilter } from '@/features/author-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { Toast } from 'primevue'
import { RouterLink } from 'vue-router'

const { categories } = useGetCategories()
</script>

<template>
  <PageTitle title="категории" />
  <Toast />
  <div class="flex justify-center md:justify-end">
    <LinkButton :to="PUBLIC_URL.adminCategoryCreate()" text="Добавить категорию" />
  </div>

  <CategoriesTable v-if="categories" :categories="categories?.data" />
</template>

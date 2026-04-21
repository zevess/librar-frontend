<script setup lang="ts">
import { CategoriesTable, useGetAdminCategories, useGetCategories } from '@/entities/category'
import { CategoryFilter } from '@/features/category-filter'
import { useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog, Toast } from 'primevue'

const { q, id, params, applyFilter, clearFilter } = useFilter()

const { categories, isFetching } = useGetAdminCategories(params)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="категории" />
    <ConfirmDialog />
    <CategoryFilter v-model:category-id-filter="id" v-model:query-filter="q" />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ActionButton class="p-4" @click="clearFilter">Сбросить</ActionButton>
        <ActionButton class="p-4" @click="applyFilter">Применить</ActionButton>
      </div>
      <LinkButton :to="PUBLIC_URL.adminCategoryCreate()" text="Добавить категорию" />
    </div>
    <SkeletonTable :cols="2" v-if="isFetching && !categories" />

    <CategoriesTable v-if="categories" :categories="categories?.data" />
    <Message v-if="categories?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</Message
    >
    <Pagination v-if="categories" :meta="categories?.meta" :links="categories?.links" />
  </div>
</template>

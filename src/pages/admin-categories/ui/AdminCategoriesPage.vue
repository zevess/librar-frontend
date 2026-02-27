<script setup lang="ts">
import { CategoriesTable } from '@/entities/category'
import { AuthorFilter } from '@/features/author-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'
</script>

<template>
  <PageTitle title="категории" />
  <!-- <div class="flex flex-col md:flex-row gap-4 justify-between"> -->
  <AuthorFilter />
  <CategoriesTable />
  <!-- <div class="flex justify-center md:justify-end">
      <RouterLink :to="PUBLIC_URL.adminAuthorCreate()" class="w-full md:w-fit">
        <ActionButton title="Добавить автора" class="p-4 w-full" />
      </RouterLink>
    </div> -->
  <!-- </div> -->
</template>

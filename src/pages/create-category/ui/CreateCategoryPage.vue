<script setup lang="ts">
import { CategoryForm } from '@/features/category-form'
import { PageTitle } from '@/shared/ui/page-title'
</script>

<template>
  <PageTitle title="добавить категорию" />
  <CategoryForm mode="create" />
</template>

<script setup lang="ts">
import { CategoryForm } from '@/features/category-form'
import { PublisherForm } from '@/features/publisher-form'
import { PageTitle } from '@/shared/ui/page-title'
import { Toast } from 'primevue'
</script>

<template>
  <PageTitle title="добавить категорию" />
  <CategoryForm mode="create" />
</template>

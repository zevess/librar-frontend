<script setup lang="ts">
import { AuthorForm } from '@/features/author-form'
import { PublisherForm } from '@/features/publisher-form'
import { PageTitle } from '@/shared/ui/page-title'
import { Toast } from 'primevue'
</script>

<template>
  <PageTitle title="добавить автора" />
  <Toast />
  <AuthorForm mode="create" />
</template>

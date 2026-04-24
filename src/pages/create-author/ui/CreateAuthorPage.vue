<script setup lang="ts">
import { AuthorForm } from '@/features/author-form'
import { PageTitle } from '@/shared/ui/page-title'
</script>

<template>
  <PageTitle title="добавить автора" />
  <AuthorForm mode="create" />
</template>

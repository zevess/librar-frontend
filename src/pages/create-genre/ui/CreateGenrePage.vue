<script setup lang="ts">
import { GenreForm } from '@/features/genre-form'
import { PageTitle } from '@/shared/ui/page-title'
</script>

<template>
  <PageTitle title="добавить жанр" />
  <GenreForm mode="create" />
</template>

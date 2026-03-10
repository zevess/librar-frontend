<script setup lang="ts">
import { useGetAuthor } from '@/entities/author'
import { AuthorForm } from '@/features/author-form'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { useRoute } from 'vue-router'

const route = useRoute()
const { author } = useGetAuthor(String(route.params.authorSlug))
</script>

<template>
  <PageTitle title="изменить автора" />
  <AuthorForm :author="author?.data" mode="edit" />
  <NotFound v-if="!author?.success">Автор не найден</NotFound>
</template>

<script setup lang="ts">
import { useGetAuthor } from '@/entities/author'
import { AuthorForm } from '@/features/author-form'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { ConfirmDialog, Toast } from 'primevue'
import { computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { author } = useGetAuthor(String(route.params.authorSlug))
watchEffect(() => {
  const title = author.value?.data?.name
  document.title = title ? 'Изменить ' + title : 'Загрузка...'
})
</script>

<template>
  <PageTitle title="изменить автора" />
  <ConfirmDialog></ConfirmDialog>
  <AuthorForm mode="edit" v-if="author?.data" :author="author?.data" />
  <NotFound v-if="!author?.success">Автор не найден</NotFound>
</template>

<script setup lang="ts">
import { AuthorFilter } from '@/features/author-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'
</script>

<template>
  <PageTitle title="авторы" />
  <div class="flex flex-col md:flex-row gap-4 justify-between">
    <AuthorFilter />
    <div class="flex justify-center md:justify-end">
      <LinkButton :to="PUBLIC_URL.adminAuthorCreate()" text="Добавить автора" />
    </div>
  </div>
</template>

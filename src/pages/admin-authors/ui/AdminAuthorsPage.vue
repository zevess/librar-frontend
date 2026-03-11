<script setup lang="ts">
import { AuthorTable, useGetAuthor, useGetAuthors } from '@/entities/author'
import { AuthorFilter } from '@/features/author-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'

const { authors } = useGetAuthors()
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="авторы" />
    <AuthorFilter />
    <div class="flex justify-center md:justify-end">
      <LinkButton :to="PUBLIC_URL.adminAuthorCreate()" text="Добавить автора" />
    </div>
    <AuthorTable v-if="authors" :authors="authors?.data" />
  </div>
</template>

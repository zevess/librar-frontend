<script setup lang="ts">
import { AuthorTable, useGetAdminAuthors, useGetAuthor, useGetAuthors } from '@/entities/author'
import { AuthorFilter, useAuthorParams } from '@/features/author-filter'
import { ApplyButton, ClearButton, useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'
import { watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const { id, q, params, applyFilter, clearFilter } = useFilter()
const { authors, isFetched, isFetching } = useGetAdminAuthors(params)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="авторы" />
    <ConfirmDialog />
    <AuthorFilter v-model:author-id-filter="id" v-model:query-filter="q" />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ActionButton class="p-4" @click="clearFilter">Сбросить</ActionButton>
        <ActionButton class="p-4" @click="applyFilter">Применить</ActionButton>
      </div>
      <LinkButton :to="PUBLIC_URL.adminAuthorCreate()" text="Добавить автора" />
    </div>
    <SkeletonTable :cols="3" v-if="isFetching && !authors" />

    <AuthorTable v-if="authors" :authors="authors?.data" />
    <Message v-if="authors?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</Message
    >
    <Pagination v-if="authors" :meta="authors?.meta" :links="authors?.links" />
  </div>
</template>

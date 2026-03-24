<script setup lang="ts">
import { AuthorTable, useGetAuthor, useGetAuthors } from '@/entities/author'
import { AuthorFilter } from '@/features/author-filter'
import { ApplyButton, ClearButton, useFilter, useParams } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()

const { filter } = useFilter()
const { params } = useParams()

watch(
  () => route.query,
  () => {
    params.value.q = route.query.q ? String(route.query.q) : ''
    params.value.id = route.query.id ? String(route.query.id) : ''
    params.value.page = Number(route.query.page)
  },
)

const { authors, isFetched, isFetching } = useGetAuthors(params.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="авторы" />
    <AuthorFilter v-model:author-id-filter="filter.id" v-model:query-filter="filter.q" />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex gap-4">
        <ApplyButton :filter="filter" />
        <ClearButton :filter="filter" />
      </div>
      <LinkButton :to="PUBLIC_URL.adminAuthorCreate()" text="Добавить автора" />
    </div>
    <SkeletonTable :cols="3" v-if="isFetching && !authors" />

    <AuthorTable v-if="authors" :authors="authors?.data" />
    <NotFound v-if="authors?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</NotFound
    >
    <Pagination v-if="authors" :meta="authors?.meta" :links="authors?.links" />
  </div>
</template>

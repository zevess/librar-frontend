<script setup lang="ts">
import { PublisherTable, useGetPublishers } from '@/entities/publisher'
import { ApplyButton, ClearButton, useFilter, useParams } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { PublisherFilter } from '@/features/publisher-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { filter } = useFilter()
const { params } = useParams()

console.log(params.value)

const apply = () => {
  const newFilters = { ...filter.value }
  newFilters.page = 1
  router.push({ query: newFilters })
}

watch(
  () => route.query,
  () => {
    params.value.q = route.query.q ? String(route.query.q) : ''
    params.value.id = route.query.id ? String(route.query.id) : ''
    params.value.page = Number(route.query.page)
  },
)

const { publishers } = useGetPublishers(params.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="издательства" />

    <PublisherFilter v-model:publisher-id-filter="filter.id" v-model:query-filter="filter.q" />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex gap-4">
        <ApplyButton :filter="filter" />
        <ClearButton />
      </div>

      <LinkButton :to="PUBLIC_URL.adminPublisherCreate()" text="Добавить издательство" />
    </div>
    <PublisherTable v-if="publishers" :publishers="publishers.data" />
    <NotFound v-if="publishers?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</NotFound
    >
    <Pagination v-if="publishers" :meta="publishers?.meta" :links="publishers?.links" />
  </div>
</template>

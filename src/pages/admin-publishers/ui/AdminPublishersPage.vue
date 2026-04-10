<script setup lang="ts">
import { PublisherTable, useGetPublishers } from '@/entities/publisher'
import { ApplyButton, ClearButton, useFilter, useParams } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { PublisherFilter, usePublisherParams } from '@/features/publisher-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'
import { watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()

const { filter } = useFilter()
const { publisherParams } = usePublisherParams()

watch(
  () => route.query,
  () => {
    publisherParams.value.q = route.query.q ? String(route.query.q) : ''
    publisherParams.value.id = route.query.id ? String(route.query.id) : ''
    publisherParams.value.page = Number(route.query.page)
  },
)

const { publishers, isFetching } = useGetPublishers(publisherParams.value)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="издательства" />
    <ConfirmDialog />
    <PublisherFilter v-model:publisher-id-filter="filter.id" v-model:query-filter="filter.q" />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ClearButton :filter="filter" />
        <ApplyButton :filter="filter" />
      </div>

      <LinkButton :to="PUBLIC_URL.adminPublisherCreate()" text="Добавить издательство" />
    </div>
    <SkeletonTable :cols="3" v-if="isFetching && !publishers" />

    <PublisherTable v-if="publishers" :publishers="publishers.data" />
    <Message v-if="publishers?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</Message
    >
    <Pagination v-if="publishers" :meta="publishers?.meta" :links="publishers?.links" />
  </div>
</template>

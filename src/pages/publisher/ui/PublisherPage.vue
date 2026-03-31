<script setup lang="ts">
import { BookList } from '@/entities/book'
import { useGetParams } from '@/shared/lib'
import { useGetPublisher } from '@/entities/publisher'
import { NotFound } from '@/shared/ui/not-found'
import PublisherHeader from './PublisherHeader.vue'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
import { computed, watch, watchEffect } from 'vue'

const { slug } = useGetParams()
const { publisher, isFetched, isFetching } = useGetPublisher(slug)
watchEffect(() => {
  const title = publisher.value?.data?.name
  document.title = title ?? 'Загрузка...'
})
</script>

<template>
  <PageSkeleton variant="publisher" v-if="isFetching && !publisher?.data" />
  <NotFound v-if="!publisher?.success && isFetched"> Издательство на найдено </NotFound>

  <div v-if="publisher?.success" class="flex flex-col gap-4 w-full">
    <PublisherHeader :publisher="publisher.data" />
    <p>{{ publisher?.data.description }}</p>
    <BookList :items="publisher?.data.books.data ?? []" variant="default" />
  </div>
</template>

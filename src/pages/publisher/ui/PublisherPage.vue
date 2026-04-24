<script setup lang="ts">
import { BookList } from '@/entities/book'
import { useGetParams } from '@/shared/lib'
import { useGetPublisher } from '@/entities/publisher'
import { Message } from '@/shared/ui/message'
import PublisherHeader from './PublisherHeader.vue'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
import { watchEffect } from 'vue'

const { slug } = useGetParams()
const { publisher, isFetched, isFetching } = useGetPublisher(slug)
watchEffect(() => {
  const title = publisher.value?.data?.name
  document.title = title ?? 'Загрузка...'
})
</script>

<template>
  <PageSkeleton variant="publisher" v-if="isFetching && !publisher?.data" />
  <Message v-if="!publisher?.success && isFetched"> Издательство на найдено </Message>

  <div v-if="publisher?.success" class="flex flex-col gap-4 w-full">
    <PublisherHeader :publisher="publisher.data" />
    <p>{{ publisher?.data.description }}</p>
    <BookList :items="publisher?.data.books ?? []" variant="default" />
  </div>
</template>

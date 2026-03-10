<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList } from '@/entities/book'
import { publisherData } from '@/entities/publisher/model/publisher.types'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { SettingButton } from '@/shared/ui/setting-button'
import { useGetParams } from '@/shared/lib'
import { useGetPublisher } from '@/entities/publisher'
import { NotFound } from '@/shared/ui/not-found'
import PublisherHeader from './PublisherHeader.vue'
import PublisherSkeleton from './PublisherSkeleton.vue'
import { PageSkeleton } from '@/shared/ui/page-skeleton'

const { slug } = useGetParams()
const { publisher, isFetched, isFetching } = useGetPublisher(slug)
</script>

<template>
  <PageSkeleton variant="publisher" v-if="isFetching && !publisher?.data" />
  <NotFound v-if="!publisher?.success && isFetched"> Издательство на найдено </NotFound>

  <div v-if="publisher?.success" class="flex flex-col gap-4 w-full">
    <PublisherHeader :publisher="publisher.data" />
    <p>{{ publisher?.data.description }}</p>
    <BookList :is-reservable="true" :items="publisher?.data.books.data ?? []" variant="default" />
  </div>
</template>

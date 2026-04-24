<script setup lang="ts">
import { useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { ActionButton } from '@/shared/ui/action-button'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog, Toast } from 'primevue'
import { Message } from '@/shared/ui/message'
import { ReviewTable, useGetAdminReviews } from '@/entities/review'
import { ReviewFilter } from '@/features/review-filter'

const { q, id, bookId, email, params, applyFilter, clearFilter } = useFilter()
const { reviews, isFetching } = useGetAdminReviews(params)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="отзывы" />
    <ConfirmDialog />
    <ReviewFilter
      v-model:review-id-filter="id"
      v-model:book-id-filter="bookId"
      v-model:email-filter="email"
      v-model:query-filter="q"
    />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ActionButton class="p-4" @click="clearFilter">Сбросить</ActionButton>
        <ActionButton class="p-4" @click="applyFilter">Применить</ActionButton>
      </div>
    </div>
    <SkeletonTable :cols="2" v-if="isFetching && !reviews" />
    <ReviewTable v-if="reviews?.data" :reviews="reviews.data" />
    <Message v-if="reviews?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</Message
    >
    <Pagination v-if="reviews" :meta="reviews?.meta" :links="reviews?.links" />
  </div>
</template>

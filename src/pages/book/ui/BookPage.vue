<script setup lang="ts">
import { useGetBook } from '@/entities/book'
import { ReviewCard, useGetBookReviews } from '@/entities/review'
import { useGetParams, usePreviousRoute } from '@/shared/lib'
import { computed, onMounted, provide, ref, watch, watchEffect } from 'vue'
import BookCharacteristics from './BookCharacteristics.vue'
import BookHeader from './BookHeader.vue'
import BookCover from './BookCover.vue'
import { Message } from '@/shared/ui/message'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
import { ReviewForm } from '@/features/review-form'
import { useUserStore } from '@/entities/user'
import { ConfirmDialog, Toast } from 'primevue'
import { SkeletonCard } from '@/shared/ui/skeleton-card'

const { slug, id } = useGetParams()
const { previousRoute } = usePreviousRoute()
const { book, isFetching, isSuccess, isFetched, refetch } = useGetBook(slug)
const { reviews, isReviewsFetched, isReviewsFetching } = useGetBookReviews(id)
const { isAuthentificated } = useUserStore()

onMounted(async () => {
  if (previousRoute.value?.name === 'books/edit') refetch()
})

watchEffect(() => {
  const title = book.value?.data?.title
  document.title = title ?? 'Загрузка...'
})
</script>

<template>
  <PageSkeleton variant="book" v-if="isFetching" />
  <ConfirmDialog />
  <Message v-if="!book?.success && isFetched"> Книга на найдена </Message>
  <div v-if="book?.data" class="flex flex-col gap-4 w-full">
    <BookHeader :book="book?.data" />

    <div class="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-16">
      <BookCover
        :average="reviews?.average"
        :book="book?.data"
        :reviews-count="Number(reviews?.data.length)"
      />

      <div class="flex flex-col gap-4 w-full md:max-w-2/3">
        <p>{{ book?.data.description }}</p>

        <div class="border border-[#bededc]"></div>

        <BookCharacteristics :book="book?.data" />

        <div class="mt-24 flex flex-col gap-4">
          <h2 class="text-xl font-semibold">ОТЗЫВЫ</h2>
          <div v-if="isReviewsFetched">
            <h3 class="text-xl" v-if="reviews?.data.length === 0">Отзывов нет</h3>
            <ReviewForm
              :book-id="book.data.id"
              v-if="!reviews?.hasUserReviewed && isAuthentificated"
            />
            <div class="flex flex-col gap-4">
              <SkeletonCard v-for="n in 4" :key="n" v-if="isReviewsFetching" />
              <ReviewCard
                v-if="reviews?.data"
                v-for="review in reviews?.data"
                :key="review.id"
                :review="review"
                variant="book"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

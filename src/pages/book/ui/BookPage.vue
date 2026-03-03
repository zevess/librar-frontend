<script setup lang="ts">
import { useGetBook } from '@/entities/book'
import { ReviewCard, useGetBookReviews } from '@/entities/review'
import { useGetParams } from '@/shared/lib'
import { provide, ref, watch } from 'vue'
import BookCharacteristics from './BookCharacteristics.vue'
import BookHeader from './BookHeader.vue'
import BookCover from './BookCover.vue'
import BookSkeleton from './BookSkeleton.vue'

const { slug, id } = useGetParams()
const { book, isFetching, isSuccess } = useGetBook(slug)
const { reviews } = useGetBookReviews(id)
const rating = ref<number>()

watch(reviews, () => {
  rating.value = reviews.value?.average
})

provide('isFetching', isFetching)
provide('rating', rating)
</script>

<template>
  <BookSkeleton v-if="isFetching" />
  <div v-if="book?.data" class="flex flex-col gap-4 w-full">
    <BookHeader :book="book?.data" />

    <div class="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-16">
      <BookCover :book="book?.data" :reviews-count="Number(reviews?.data.length)" />

      <div class="flex flex-col gap-4 w-full md:max-w-2/3">
        <p>{{ book?.data.description }}</p>

        <div class="border border-[#bededc]"></div>

        <BookCharacteristics :book="book?.data" />

        <div class="mt-24 flex flex-col gap-4">
          <h2 class="text-xl font-semibold">ОТЗЫВЫ</h2>
          <ReviewCard v-for="review in reviews?.data" :key="review.id" :review="review" />
        </div>
      </div>
    </div>
  </div>
</template>

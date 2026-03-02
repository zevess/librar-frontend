<script setup lang="ts">
import { useGetBook } from '@/entities/book'
import { bookData, type IBook } from '@/entities/book/model/book.types'
import { ReviewCard, useGetBookReviews } from '@/entities/review'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { useGetParams } from '@/shared/lib'
import { ActionButton } from '@/shared/ui/action-button'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { PrimeRating } from '@/shared/ui/rating'
import { SettingButton } from '@/shared/ui/setting-button'
import { Skeleton } from 'primevue'
import { provide, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BookCharacteristics from './BookCharacteristics.vue'
import BookHeader from './BookHeader.vue'

const rating = ref<number>()

const { slug, id } = useGetParams()
const { book, isFetching, isSuccess } = useGetBook(slug)

const { reviews } = useGetBookReviews(id)
watch(reviews, () => {
  rating.value = reviews.value?.average
})

provide('isFetching', isFetching)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center flex-col md:flex-row justify-center md:justify-between">
      <div v-if="isFetching" class="flex flex-col items-center md:items-start gap-6 mt-4">
        <Skeleton height="32px" width="260px"></Skeleton>
        <Skeleton height="24px" width="120px"></Skeleton>
      </div>
      <BookHeader v-if="book?.data" :book="book?.data" />
    </div>

    <div class="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-16">
      <div class="flex flex-col w-full max-w-80 md:sticky md:top-2">
        <img
          :src="book?.data.image ?? bookData[0]?.image"
          class="w-full h-full object-contain rounded"
          alt=""
        />
        <Skeleton v-if="isFetching" width="100%" height="100%" class="aspect-2/3"></Skeleton>

        <div class="flex flex-col mt-4 gap-1">
          <span class="text-gray-500">Доступно</span>
          <ActionButton
            class="w-full h-12"
            :disabled="!book?.data.isAvailable"
            title="Забронировать"
          ></ActionButton>
        </div>
        <div class="mt-6 flex items-center gap-4">
          <span class="text-4xl">{{ rating }}</span>
          <PrimeRating v-model="rating" readonly font-size="x-large" />
          <span>{{ reviews?.data.length }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-full md:max-w-2/3">
        <p>
          {{ book?.data.description }}
        </p>
        <div v-if="isFetching" class="flex flex-col gap-2">
          <Skeleton v-for="n in 3" :key="n" width="100%"></Skeleton>
        </div>

        <div class="border border-[#bededc]"></div>
        <ul v-if="isFetching" class="w-full gap-4 grid grid-cols-1 lg:grid-cols-2 justify-between">
          <li class="flex gap-8" v-for="n in 4" :key="n">
            <Skeleton width="120px"></Skeleton>
            <Skeleton width="200px"></Skeleton>
          </li>
        </ul>
        <BookCharacteristics v-if="book?.data" :book="book?.data" />

        <div class="mt-24 flex flex-col gap-4">
          <h2 class="text-xl font-semibold">ОТЗЫВЫ</h2>
          <ReviewCard v-for="review in reviews?.data" :key="review.id" :review="review" />
        </div>
      </div>
    </div>
  </div>
</template>

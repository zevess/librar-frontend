<script setup lang="ts">
import { PrimeRating } from '@/shared/ui/rating'
import type { IReview } from '../model/review.types'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { convertedDate } from '@/shared/lib'

const props = defineProps<{
  review: IReview
  variant: 'book' | 'user'
}>()

const rating = ref(props.review.rating)
</script>

<template>
  <div
    :class="[
      `w-full p-6 flex flex-col gap-5 rounded`,
      rating > 3 ? 'bg-green-100/60' : 'bg-red-100/50',
    ]"
  >
    <div class="flex justify-between">
      <div class="flex gap-4">
        <span v-if="variant == 'book'" class="font-semibold text-xl text-black">{{
          review.user.name
        }}</span>
        <RouterLink
          v-if="variant == 'user'"
          :to="PUBLIC_URL.book(`${review.book.slug}-${review.book.id}`)"
          class="font-semibold text-xl text-black hover:underline"
          >{{ review.book.title }}</RouterLink
        >
      </div>

      <span>{{ convertedDate(review.createdAt) }}</span>
    </div>
    <PrimeRating font-size="16px" v-model="rating" readonly />
    <p class="text-black">{{ review.text }}</p>
  </div>
</template>

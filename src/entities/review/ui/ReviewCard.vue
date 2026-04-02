<script setup lang="ts">
import { PrimeRating } from '@/shared/ui/rating'
import type { IReview } from '../model/review.types'
import { inject, ref } from 'vue'
import { Skeleton } from 'primevue'

const props = defineProps<{
  review: IReview
}>()

const rating = ref(props.review.rating)
const isFetching = inject('isFetching')
</script>

<template>
  <Skeleton v-if="isFetching" width="100%" height="200px" class="rounded"></Skeleton>
  <div
    :class="[
      `w-full p-6 flex flex-col gap-5 rounded my-4`,
      rating > 3 ? 'bg-green-100/60' : 'bg-red-100/50',
    ]"
  >
    <div class="flex justify-between">
      <span class="font-semibold">{{ review.user.name }}</span>
      <span>{{ new Date(review.created_at).toLocaleDateString('ru-RU') }}</span>
    </div>
    <PrimeRating font-size="16px" v-model="rating" readonly />
    <p>{{ review.text }}</p>
  </div>
</template>

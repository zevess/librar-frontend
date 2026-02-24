<script setup lang="ts">
import { PrimeRating } from '@/shared/ui/rating'
import type { IReview } from '../../model/types'
import { ref } from 'vue'

const props = defineProps<IReview>()
const rating = ref(props.rating)
</script>

<template>
  <div
    :class="[
      `w-full p-6 flex flex-col gap-5 rounded`,
      rating > 3 ? 'bg-green-100/60' : 'bg-red-100/50',
    ]"
  >
    <span>{{ name }}</span>
    <PrimeRating v-model="rating" readonly />
    <p>{{ text }}</p>
  </div>
</template>

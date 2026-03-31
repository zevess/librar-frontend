<script setup lang="ts">
import type { IBook } from '@/entities/book'
import { useCreateReservation } from '@/entities/reservation'
import { ReserveButton } from '@/features/reserve-button'
import { SubscribeButton } from '@/features/subscribe-button'
import { ActionButton } from '@/shared/ui/action-button'
import { PrimeRating } from '@/shared/ui/rating'
import { StoredImage } from '@/shared/ui/stored-image'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  book: IBook
  reviewsCount: number
  average?: number
}>()
const rating = computed(() => props.average)
const isAvailable = ref(props.book.isAvailable)
const isSubscribed = ref(props.book.isSubscribed)
</script>

<template>
  <div class="flex flex-col w-full max-w-80 md:sticky md:top-2">
    <StoredImage :url="book.image" />
    <div class="flex flex-col mt-4 gap-1">
      <span class="text-gray-500">{{ isAvailable ? 'Доступно' : 'Забронировано' }}</span>
      <div class="flex flex-col gap-3">
        <ReserveButton :book-id="String(book.id)" :is-available="isAvailable" />
        <SubscribeButton :book-id="book.id" :is-subscribed="isSubscribed" />
      </div>
    </div>
    <div class="mt-6 flex items-center gap-4">
      <span v-if="rating" class="text-4xl">{{ rating }}</span>
      <PrimeRating v-model="rating" readonly font-size="x-large" />
      <span>{{ reviewsCount }}</span>
    </div>
  </div>
</template>

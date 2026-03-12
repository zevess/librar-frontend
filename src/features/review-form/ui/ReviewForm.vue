<script setup lang="ts">
import { useCreateReview } from '@/entities/review'
import { ActionButton } from '@/shared/ui/action-button'
import { PrimeRating } from '@/shared/ui/rating'
import { Textarea } from '@/shared/ui/textarea'
import { ref, watch } from 'vue'

const props = defineProps<{
  bookId: number
}>()

const text = ref<string>('')
const rating = ref()

const { createReview } = useCreateReview(String(props.bookId))

const onClick = () => {
  const data = {
    text: text.value,
    rating: rating.value,
  }
  createReview(data)
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <PrimeRating v-model="rating" font-size="28px"></PrimeRating>
    <span class="text-red-500" v-if="rating === null">Ошибка! Укажите оценку</span>
    <Textarea v-model="text" placeholder="введите ваш отзыв..."> </Textarea>
    <ActionButton
      :disabled="rating === null || rating === undefined || text?.length < 10"
      class="w-fit p-3 ml-auto"
      title="Отправить отзыв"
      @click="onClick"
    />
  </div>
</template>

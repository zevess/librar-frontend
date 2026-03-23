<script setup lang="ts">
import { useCreateReservation } from '@/entities/reservation'
import { ActionButton } from '../action-button'
import { useUserStore } from '@/entities/user'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { ref } from 'vue'

const props = defineProps<{
  bookId: string
  isAvailable: boolean
}>()

const isAvailable = ref(props.isAvailable)

const { isAuthentificated } = useUserStore()
const router = useRouter()

const { reserve } = useCreateReservation()

const reserveBook = () => {
  if (!isAuthentificated) router.replace(PUBLIC_URL.auth())
  else {
    reserve(props.bookId)
    isAvailable.value = !isAvailable.value
  }
}
</script>

<template>
  <ActionButton
    :disabled="!isAvailable"
    @click="reserveBook"
    :title="isAvailable ? 'Забронировать' : 'Забронировано'"
    class="w-full text-xs"
  />
</template>

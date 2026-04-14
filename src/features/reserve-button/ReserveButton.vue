<script setup lang="ts">
import { useCreateReservation } from '@/entities/reservation'

import { useUserStore } from '@/entities/user'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { ref } from 'vue'
import { ActionButton } from '@/shared/ui/action-button'

const props = defineProps<{
  bookId: string
  isAvailable: boolean
}>()

const isAvailable = ref(props.isAvailable)

const { isAuthentificated } = useUserStore()
const router = useRouter()

const { reserve, isSuccess } = useCreateReservation()

const reserveBook = () => {
  if (!isAuthentificated) {
    router.push(PUBLIC_URL.auth())
    return
  }
  reserve(props.bookId, {
    onSuccess() {
      isAvailable.value = !isAvailable.value
    },
  })
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

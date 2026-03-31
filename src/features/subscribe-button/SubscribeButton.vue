<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { useSubscribeBook, useUnsubscribeBook } from '@/entities/subscription'
import { useUserStore } from '@/entities/user'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { ActionButton } from '@/shared/ui/action-button'

const props = defineProps<{
  bookId: number
  isSubscribed: boolean
}>()

const isSubscribed = ref(props.isSubscribed)

const { isAuthentificated } = useUserStore()
const router = useRouter()

const { subscribe } = useSubscribeBook()
const { unsubscribe } = useUnsubscribeBook()

const handleFollowAction = () => {
  if (!isAuthentificated) router.replace(PUBLIC_URL.auth())
  isSubscribed.value ? unsubscribe(String(props.bookId)) : subscribe(String(props.bookId))
  isSubscribed.value = !isSubscribed.value
}
</script>

<template>
  <ActionButton
    @click="handleFollowAction"
    :title="isSubscribed ? 'Перестать отслеживать' : 'Отслеживать'"
  >
    <span :class="isSubscribed ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"></span>
  </ActionButton>
</template>

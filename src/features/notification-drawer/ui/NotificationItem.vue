<script setup lang="ts">
import type { IUserNotifications } from '@/entities/user'
import { PUBLIC_URL } from '@/shared/config'
import { convertedDate } from '@/shared/lib'
import { RouterLink } from 'vue-router'

defineProps<{
  notification: IUserNotifications
}>()
</script>

<template>
  <div class="my-4">
    Отслеживаемая вами книга
    <RouterLink
      :to="
        PUBLIC_URL.book(`${notification.notificationData.slug}-${notification.notificationData.id}`)
      "
      class="font-semibold"
      >{{ notification.notificationData.title }}</RouterLink
    >
    снова доступна
    <span class="text-gray-500">{{ convertedDate(notification.createdAt) }}</span>
  </div>
</template>

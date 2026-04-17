<script setup lang="ts">
import { useGetNotifications, useProfile, useReadNotifications } from '@/entities/user'
import { PUBLIC_URL } from '@/shared/config'
import { convertedDate } from '@/shared/lib'
import { Drawer } from 'primevue'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const { profile } = useProfile()
const notificationCount = computed(() => profile.value?.data.notifications)

const visible = ref(false)

const { readNotifications } = useReadNotifications()
const { notifications } = useGetNotifications()

const drawerClick = () => {
  visible.value = true
  readNotifications()
}
</script>

<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" position="right" header="Уведомления">
      <div v-for="notification in notifications?.data" class="my-4">
        Отслеживаемая вами книга
        <RouterLink
          :to="
            PUBLIC_URL.book(
              `${notification.notificationData.slug}-${notification.notificationData.id}`,
            )
          "
          class="font-semibold"
          >{{ notification.notificationData.title }}</RouterLink
        >
        снова доступна
        <span class="text-gray-500">{{ convertedDate(notification.createdAt) }}</span>
      </div>
    </Drawer>
    <div
      class="relative flex flex-col items-center transition hover:bg-gray-100 p-3 cursor-pointer rounded-2xl"
      @click="drawerClick"
    >
      <i class="pi pi-bell" style="font-size: 24px" />
      <span
        v-if="notificationCount && notificationCount > 0"
        class="h-6 w-6 flex items-center justify-center rounded-full bg-[#bededc] absolute translate-x-1/2 -translate-y-1/2"
        >{{ notificationCount }}</span
      >
    </div>
  </div>
</template>

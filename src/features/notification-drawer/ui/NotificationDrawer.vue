<script setup lang="ts">
import { useGetNotifications, useProfile, useReadNotifications } from '@/entities/user'
import { Drawer } from 'primevue'
import { computed, ref } from 'vue'
import NotificationTrigger from './NotificationTrigger.vue'
import NotificationItem from './NotificationItem.vue'

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
      <div
        v-if="Number(notifications?.data.length) < 1"
        class="h-full flex items-center justify-center"
      >
        Уведомлений нет
      </div>
      <div v-for="notification in notifications?.data">
        <NotificationItem :notification="notification" :key="notification.id" />
      </div>
    </Drawer>
    <NotificationTrigger @click="drawerClick" :notification-count="notificationCount" />
  </div>
</template>

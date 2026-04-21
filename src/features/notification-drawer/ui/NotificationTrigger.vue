<script setup lang="ts">
defineProps<{
  notificationCount: number | undefined
}>()
</script>

<template>
  <div
    class="relative flex flex-col items-center transition hover:bg-gray-100 p-3 cursor-pointer rounded-2xl"
  >
    <i class="pi pi-bell" style="font-size: 24px" />
    <span
      v-if="notificationCount && notificationCount > 0"
      class="h-6 w-6 flex items-center justify-center rounded-full bg-[#bededc] absolute translate-x-1/2 -translate-y-1/2"
      >{{ notificationCount }}</span
    >
  </div>
</template>

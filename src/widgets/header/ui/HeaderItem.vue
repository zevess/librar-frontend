<script setup lang="ts">
defineProps<{
  icon: string
  title: string
}>()
</script>

<template>
  <li
    class="flex flex-col items-center transition hover:bg-gray-100 p-2 cursor-pointer rounded-2xl"
  >
    <span :class="`pi pi-${icon}`" style="font-size: 24px"></span>
    <span class="lowercase font-medium">{{ title }}</span>
  </li>
</template>

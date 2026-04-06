<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    icon: string
    iconStyles?: string
    titleStyles?: string
    showTitle?: boolean
  }>(),
  {
    iconStyles: 'font-size: 24px',
    showTitle: true,
  },
)
</script>

<template>
  <li
    :title="title"
    class="flex flex-col items-center transition hover:bg-gray-100 p-3 cursor-pointer rounded-2xl"
  >
    <span :class="`pi pi-${icon}`" :style="iconStyles"></span>
    <span v-if="showTitle" :class="['lowercase font-medium', titleStyles]">{{ title }}</span>
  </li>
</template>

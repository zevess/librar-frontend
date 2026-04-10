<script setup lang="ts">
import { useProfile } from '@/entities/user'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
withDefaults(
  defineProps<{
    to: string
    iconSize?: string
  }>(),
  {
    iconSize: 'x-large',
  },
)
const { profile } = useProfile()
const isAdmin = computed(
  () => profile.value?.data.role === 'admin' || profile.value?.data.role === 'librarian',
)
</script>

<template>
  <RouterLink v-if="isAdmin" :to="to">
    <span
      class="pi pi-cog transition hover:rotate-90 cursor-pointer hover:bg-gray-100 p-3 rounded-full"
      :style="[`font-size: ${iconSize}`]"
    ></span>
  </RouterLink>
</template>

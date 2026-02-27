<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Container } from './shared/ui/container'
import { AdminLayout, Layout } from './widgets/layouts'
import { computed } from 'vue'

const route = useRoute()
const layouts = {
  default: Layout,
  admin: AdminLayout,
} as const

const CurrentLayout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts
  return layouts[layoutName] || Layout
})
</script>

<template>
  <component :is="CurrentLayout">
    <RouterView />
  </component>
</template>

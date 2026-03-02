<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Container } from './shared/ui/container'
import { AdminLayout, AuthLayout, Layout } from './widgets/layouts'
import { computed } from 'vue'
import { useProfile } from './entities/user'
import { useUserStore } from './stores/counter'

const route = useRoute()
const layouts = {
  default: Layout,
  admin: AdminLayout,
  auth: AuthLayout,
} as const

const CurrentLayout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts
  return layouts[layoutName] || Layout
})
useProfile()
useUserStore().initFromCookies()
</script>

<template>
  <component :is="CurrentLayout">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </component>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Container } from './shared/ui/container'
import { AdminLayout, AuthLayout, Layout } from './widgets/layouts'
import { computed } from 'vue'
import { useProfile, useUserStore } from './entities/user'

const route = useRoute()
const layouts = {
  default: Layout,
  admin: AdminLayout,
  auth: AuthLayout,
} as const

const CurrentLayout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts
  return layouts[layoutName]
})
useProfile()
useUserStore().initFromCookies()
</script>

<template>
  <component :is="CurrentLayout">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </component>
</template>

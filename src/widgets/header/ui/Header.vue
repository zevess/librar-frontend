<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { IHeaderNavItem } from '../model/types'
import { useHeaderStatus } from '@/shared/lib'
import { useUserStore } from '@/entities/user'
import { NotificationDrawer } from '@/features/notification-drawer'
import { NavigationItem } from '@/shared/ui/navigation-item'

defineProps<{
  items?: IHeaderNavItem[]
  variant: 'default' | 'admin'
}>()
const { isAuthentificated } = useUserStore()
const { isHeaderVisible } = useHeaderStatus()
</script>

<template>
  <header
    id="header"
    :class="{ '-translate-y-full': !isHeaderVisible }"
    class="sticky top-0 mt-4 h-16 md:h-24 flex justify-between bg-white rounded-xl shadow-lg p-4 z-50 transition-transform duration-300"
  >
    <ul class="w-full flex justify-between items-center gap-4">
      <slot></slot>
      <div class="flex items-center">
        <div :class="['hidden gap-1 lg:gap-3 md:flex']">
          <RouterLink v-for="item in items" :to="item.url">
            <NavigationItem
              :show-title="variant === 'default'"
              :icon="item.icon"
              :title="item.title"
            />
          </RouterLink>
        </div>
        <NotificationDrawer v-if="isAuthentificated" />
      </div>
    </ul>
  </header>
</template>

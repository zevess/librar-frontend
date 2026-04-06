<script setup lang="ts">
import { NavigationItem } from '@/shared/ui/navigation-item'
import type { IFooterNavItem } from '../model/types'

defineProps<{
  items?: IFooterNavItem[]
}>()
</script>

<template>
  <footer class="flex justify-between bg-white rounded-xl shadow-lg pt-1 bottom-2 sticky">
    <ul class="w-full flex justify-around items-center gap-4">
      <RouterLink v-for="item in items" :to="item.url">
        <NavigationItem :icon="item.icon" :title="item.title" />
      </RouterLink>
      <slot></slot>
    </ul>
  </footer>
</template>

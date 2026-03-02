<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeaderItem from './HeaderItem.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { IHeaderNavItem } from '../model/types'
import { useProfile } from '@/entities/user'
import { useHeaderStatus } from '@/shared/lib'

defineProps<{
  items?: IHeaderNavItem[]
}>()

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
      <div class="hidden md:flex gap-4">
        <RouterLink v-for="item in items" :to="item.url">
          <HeaderItem :icon="item.icon" :title="item.title"></HeaderItem>
        </RouterLink>
      </div>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeaderItem from './HeaderItem.vue'
import type { IHeaderNavItem } from '../model/types'
import { useHeaderStatus } from '@/shared/lib'
import { PrimeDrawer } from '@/shared/ui/drawer'

defineProps<{
  items?: IHeaderNavItem[]
  variant: 'default' | 'admin'
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
      <div
        :class="[
          'hidden gap-1',
          variant == 'admin' && 'lg:flex',
          variant == 'default' && 'md:flex',
        ]"
      >
        <RouterLink v-for="item in items" :to="item.url">
          <HeaderItem :icon="item.icon" :title="item.title"></HeaderItem>
        </RouterLink>
      </div>

      <div v-if="variant == 'admin'" class="block lg:hidden">
        <PrimeDrawer drawer-name="Навигация" icon="bars">
          <div class="grid grid-cols-2 gap-2">
            <RouterLink v-for="item in items" :to="item.url">
              <HeaderItem :icon="item.icon" :title="item.title"></HeaderItem>
            </RouterLink>
          </div>
        </PrimeDrawer>
      </div>
    </ul>
  </header>
</template>

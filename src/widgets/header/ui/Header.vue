<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeaderItem from './HeaderItem.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { IHeaderNavItem } from '../model/types'
import { useProfile } from '@/entities/user'

defineProps<{
  items?: IHeaderNavItem[]
}>()

const isHeaderVisible = ref(true)
let lastScrollY = ref(0)

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > lastScrollY.value && currentScrollY > 200) {
    isHeaderVisible.value = false
  } else {
    isHeaderVisible.value = true
  }

  lastScrollY.value = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// const items = useHeaderNavigation()
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

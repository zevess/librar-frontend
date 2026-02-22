<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeaderItem from './HeaderItem.vue'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { SearchInput } from '@/shared/ui/search-input'
import { Logo } from '@/shared/ui/logo'
import { CatalogButton } from '@/shared/ui/catalog-button'
import { useHeaderNavigation } from '../model/useNavigation'
import { ref, onMounted, onUnmounted } from 'vue'

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

const items = useHeaderNavigation()
</script>

<template>
  <header
    id="header"
    :class="{ '-translate-y-full': !isHeaderVisible }"
    class="sticky top-0 mt-4 h-16 md:h-24 flex justify-between bg-white rounded-xl shadow-lg p-4 z-50 transition-transform duration-300"
  >
    <ul class="w-full flex justify-between items-center gap-4">
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <RouterLink class="hidden md:block" :to="PUBLIC_URL.catalog()">
        <CatalogButton />
      </RouterLink>
      <div class="hidden md:flex md:w-4/12">
        <SearchInput />
      </div>

      <div class="hidden md:flex gap-4">
        <RouterLink v-for="item in items" :to="item.url">
          <HeaderItem :icon="item.icon" :title="item.title"></HeaderItem>
        </RouterLink>
      </div>
    </ul>
  </header>
</template>

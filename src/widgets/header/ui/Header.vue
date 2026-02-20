<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useNavigation } from '../model/useNavigation'
import HeaderItem from './HeaderItem.vue'
import CatalogButton from './CatalogButton.vue'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { SearchInput } from '@/shared/ui/search-input'
import { Logo } from '@/shared/ui/logo'

const items = useNavigation()
</script>

<template>
  <header class="flex justify-between bg-white rounded-xl shadow-lg mt-4 p-4">
    <ul class="w-full flex justify-between items-center">
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <RouterLink :to="PUBLIC_URL.catalog()">
        <CatalogButton />
      </RouterLink>
      <SearchInput />

      <div class="flex gap-4">
        <RouterLink v-for="item in items" :to="item.url">
          <HeaderItem :icon="item.icon" :title="item.title"></HeaderItem>
        </RouterLink>
      </div>
    </ul>
  </header>
</template>

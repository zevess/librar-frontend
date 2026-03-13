<script setup lang="ts">
import { PUBLIC_URL } from '@/shared/config'
import { IconButton } from '@/shared/ui/icon-button'
import { Input } from '@/shared/ui/input'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchQuery = ref(route.query.q)

const handleSetQuery = () => {
  router.push({
    path: PUBLIC_URL.catalog(),
    query: {
      ...route.query,
      q: searchQuery.value,
      page: 1,
    },
  })
}
</script>

<template>
  <Input
    v-model="searchQuery"
    @keyup.enter="handleSetQuery"
    placeholder="найти..."
    class="w-full rounded-r-none"
  />
  <IconButton @click="handleSetQuery" icon="search" class="rounded-l-none" />
</template>

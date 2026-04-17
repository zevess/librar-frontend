<script setup lang="ts">
import { useGetBooksByQuery } from '@/entities/book'
import { PUBLIC_URL } from '@/shared/config'
import { IconButton } from '@/shared/ui/icon-button'
import { StoredImage } from '@/shared/ui/stored-image'
import { useDebounceFn } from '@vueuse/core'
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

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

const { findBook, books } = useGetBooksByQuery()

const search = useDebounceFn((event: AutoCompleteCompleteEvent) => {
  findBook(event.query)
}, 800)
const onSelect = (event: AutoCompleteOptionSelectEvent) => {
  searchQuery.value = event.value.title
}
</script>

<template>
  <AutoComplete
    v-model="searchQuery"
    :suggestions="books?.data"
    option-label="title"
    @option-select="onSelect"
    @complete="search"
    show-clear
    placeholder="найти"
    input-class="p-autocomplete-input-search"
    class="w-full"
    @keyup.enter="handleSetQuery"
  >
    <template #empty>
      <div class="p-3 text-gray-500">Книги не найдены</div>
    </template>
    <template #option="slotProps">
      <RouterLink
        class="relative w-full flex items-center gap-4 h-8"
        :to="PUBLIC_URL.book(`${slotProps.option.slug}-${slotProps.option.id}`)"
      >
        <StoredImage v-if="slotProps.option.image" :url="slotProps.option.image" />
        {{ slotProps.option.title }}
      </RouterLink>
    </template>
  </AutoComplete>
  <IconButton @click="handleSetQuery" icon="search" class="rounded-l-none" />
</template>

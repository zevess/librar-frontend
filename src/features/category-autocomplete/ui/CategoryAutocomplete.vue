<script setup lang="ts">
import { useGetCategories, useGetCategoriesByQuery, type ICategory } from '@/entities/category'
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'
import { computed, ref } from 'vue'

const { categories } = useGetCategories()
const selectedCategory = defineModel<ICategory | string | null>('selectedCategory')
const category = defineModel<null | number>('category')
const filteredCategories = ref<ICategory[]>([])

const search = (event: AutoCompleteCompleteEvent) => {
  if (!categories.value?.data) {
    filteredCategories.value = []
    return
  }

  const query = event.query.toLowerCase().trim()

  filteredCategories.value = query
    ? categories.value?.data.filter((category) => category.name.toLowerCase().includes(query))
    : categories.value?.data
}
const onSelect = (event: AutoCompleteOptionSelectEvent) => {
  category.value = event.value.id
}
</script>

<template>
  <AutoComplete
    :suggestions="filteredCategories"
    option-label="name"
    v-model="selectedCategory"
    @option-select="onSelect"
    @complete="search"
    forceSelection
    show-clear
    placeholder="категория"
  >
    <template #empty>
      <div class="p-3 text-gray-500">Категория не найдена</div>
    </template>
  </AutoComplete>
</template>

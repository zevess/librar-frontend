<script setup lang="ts">
import { useGetCategories, type ICategory } from '@/entities/category'
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'
import { computed, ref } from 'vue'

const { categories } = useGetCategories()
const selectedCategory = defineModel<ICategory>('selectedCategory')
const filteredCategory = ref<ICategory[]>([])

const search = (event: AutoCompleteCompleteEvent) => {
  if (!categories.value?.data) {
    filteredCategory.value = []
    return
  }

  const query = event.query.toLowerCase().trim()

  filteredCategory.value = query
    ? categories.value.data.filter((category) => category.name.toLowerCase().includes(query))
    : categories.value.data
}
</script>

<template>
  <AutoComplete
    :suggestions="filteredCategory"
    option-label="name"
    v-model="selectedCategory"
    @complete="search"
  >
    <template #empty>
      <div class="p-3 text-gray-500">Категория не найдена</div>
    </template>
  </AutoComplete>
</template>

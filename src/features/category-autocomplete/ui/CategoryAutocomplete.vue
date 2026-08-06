<script setup lang="ts">
import { useGetCategories, type ICategory } from '@/entities/category'
import {
  AutoComplete,
  InputGroup,
  InputGroupAddon,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'
import { computed, ref, watch } from 'vue'

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

const isSelected = computed(() => {
  return typeof selectedCategory.value === 'object' && selectedCategory.value !== null
})

watch(selectedCategory, (newValue) => {
  if (!newValue || typeof newValue === 'string') {
    category.value = null
  }
})
</script>

<template>
  <InputGroup>
    <InputGroupAddon v-if="isSelected">
      <i class="pi pi-check"></i>
    </InputGroupAddon>
    <AutoComplete
      :suggestions="filteredCategories"
      v-model="selectedCategory"
      @option-select="onSelect"
      @complete="search"
      placeholder="категория"
      option-label="name"
      forceSelection
      show-clear
      dropdown
    >
      <template #empty>
        <div class="p-3 text-gray-500">Категория не найдена</div>
      </template>
    </AutoComplete>
  </InputGroup>
</template>

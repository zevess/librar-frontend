<script setup lang="ts">
import { useGetAuthorsByQuery, type IAuthor } from '@/entities/author'
import { useDebounceFn } from '@vueuse/core'
import {
  AutoComplete,
  InputGroup,
  InputGroupAddon,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'
import { computed, watch } from 'vue'

defineProps<{
  disabled: boolean
}>()

const { authors, findAuthor } = useGetAuthorsByQuery()
const selectedAuthor = defineModel<IAuthor | string | null>('selectedAuthor')
const author = defineModel<null | number>('author')

const search = useDebounceFn((event: AutoCompleteCompleteEvent) => {
  findAuthor(event.query)
}, 800)

const onSelect = (event: AutoCompleteOptionSelectEvent) => {
  author.value = event.value.id
}

const isSelected = computed(() => {
  return typeof selectedAuthor.value === 'object' && selectedAuthor.value !== null
})

watch(selectedAuthor, (newValue) => {
  if (!newValue || typeof newValue === 'string') {
    author.value = null
  }
})
</script>

<template>
  <InputGroup>
    <InputGroupAddon v-if="isSelected">
      <i class="pi pi-check"></i>
    </InputGroupAddon>
    <AutoComplete
      :suggestions="authors?.data"
      option-label="name"
      v-model="selectedAuthor"
      @option-select="onSelect"
      @complete="search"
      show-clear
      placeholder="автор"
      :disabled="disabled"
    >
      <template #empty>
        <div class="p-3 text-gray-500">Авторы не найдены</div>
      </template>
    </AutoComplete>
  </InputGroup>
</template>

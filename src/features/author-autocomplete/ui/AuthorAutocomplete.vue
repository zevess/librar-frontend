<script setup lang="ts">
import { useGetAuthorsByQuery, type IAuthor } from '@/entities/author'
import { useDebounceFn } from '@vueuse/core'
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'

const { authors, findAuthor } = useGetAuthorsByQuery()
const selectedAuthor = defineModel<IAuthor | string | null>('selectedAuthor')
const author = defineModel<null | number>('author')

const search = useDebounceFn((event: AutoCompleteCompleteEvent) => {
  findAuthor(event.query)
}, 800)

const onSelect = (event: AutoCompleteOptionSelectEvent) => {
  author.value = event.value.id
}
</script>

<template>
  <AutoComplete
    :suggestions="authors?.data"
    option-label="name"
    v-model="selectedAuthor"
    @option-select="onSelect"
    @complete="search"
    show-clear
    placeholder="автор"
  >
    <template #empty>
      <div class="p-3 text-gray-500">Авторы не найдены</div>
    </template>
  </AutoComplete>
</template>

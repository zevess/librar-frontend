<script setup lang="ts">
import { useGetPublishersByQuery, type IPublisher } from '@/entities/publisher'
import { useDebounceFn } from '@vueuse/core'
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'

const { publishers, findPublisher } = useGetPublishersByQuery()
const selectedPublisher = defineModel<IPublisher | string | null>('selectedPublisher')
const publisher = defineModel<null | number>('publisher')

const search = useDebounceFn((event: AutoCompleteCompleteEvent) => {
  findPublisher(event.query)
}, 800)
const onSelect = (event: AutoCompleteOptionSelectEvent) => {
  publisher.value = event.value.id
}
</script>

<template>
  <AutoComplete
    :suggestions="publishers?.data"
    option-label="name"
    v-model="selectedPublisher"
    @option-select="onSelect"
    @complete="search"
    forceSelection
    show-clear
    placeholder="издательство"
  >
    <template #empty>
      <div class="p-3 text-gray-500">Издательства не найдены</div>
    </template>
  </AutoComplete>
</template>

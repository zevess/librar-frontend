<script setup lang="ts">
import { useGetPublishersByQuery, type IPublisher } from '@/entities/publisher'
import { useDebounceFn } from '@vueuse/core'
import {
  AutoComplete,
  InputGroup,
  InputGroupAddon,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'
import { computed, watch } from 'vue'

const { publishers, findPublisher } = useGetPublishersByQuery()
const selectedPublisher = defineModel<IPublisher | string | null>('selectedPublisher')
const publisher = defineModel<null | number>('publisher')

const search = useDebounceFn((event: AutoCompleteCompleteEvent) => {
  findPublisher(event.query)
}, 800)
const onSelect = (event: AutoCompleteOptionSelectEvent) => {
  publisher.value = event.value.id
}

const isSelected = computed(() => {
  return typeof selectedPublisher.value === 'object' && selectedPublisher.value !== null
})

watch(selectedPublisher, (newValue) => {
  if (!newValue || typeof newValue === 'string') {
    publisher.value = null
  }
})
</script>

<template>
  <InputGroup>
    <InputGroupAddon v-if="isSelected"> <i class="pi pi-check"></i> </InputGroupAddon>
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
  </InputGroup>
</template>

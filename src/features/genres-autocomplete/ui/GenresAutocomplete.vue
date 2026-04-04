<script setup lang="ts">
import { useGetGenres, type IGenre } from '@/entities/genre'
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
  type AutoCompleteOptionSelectEvent,
} from 'primevue'
import { computed, ref } from 'vue'

const { genres } = useGetGenres()
const selectedGenres = defineModel<IGenre[]>('selectedGenres')
const filteredGenres = ref<IGenre[]>([])

const search = (event: AutoCompleteCompleteEvent) => {
  if (!genres.value?.data) {
    filteredGenres.value = []
    return
  }

  const query = event.query.toLowerCase().trim()

  filteredGenres.value = query
    ? genres.value.data.filter((genre) => genre.name.toLowerCase().includes(query))
    : genres.value.data
}
</script>

<template>
  <AutoComplete
    v-model="selectedGenres"
    :suggestions="filteredGenres"
    multiple
    @complete="search"
    option-label="name"
  >
    <template #empty>
      <div class="p-3 text-gray-500">Жанры не найдены</div>
    </template>
  </AutoComplete>
</template>

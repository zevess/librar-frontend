<script setup lang="ts">
import { ref, onMounted } from 'vue'

import {
  Column,
  DataTable,
  type DataTableRowClickEvent,
  type DataTableRowEditSaveEvent,
  type DataTableRowSelectEvent,
} from 'primevue'
import type { IBook } from '../model/book.types'
import { StoredImage } from '@/shared/ui/stored-image'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'

defineProps<{
  books: IBook[]
}>()
const selectedRow = ref()
const router = useRouter()

const onRowClick = (event: DataTableRowClickEvent) => {
  console.log(event.data)
  router.push(PUBLIC_URL.book(`${event.data.slug}-${event.data.id}`))
}
</script>
<template>
  <DataTable
    v-model:selection="selectedRow"
    @row-click="onRowClick"
    selection-mode="single"
    :value="books"
    dataKey="id"
  >
    <Column field="id" header="ID" style="width: 20%"> </Column>
    <Column field="title" header="Название"></Column>
    <Column field="image" header="Обложка">
      <template #body="slotProps">
        <StoredImage :url="`${slotProps.data.image}`" class="max-w-24 rounded" /> </template
    ></Column>
    <Column field="author.name" header="Автор"></Column>
    <Column field="category.name" header="Категория"></Column>
    <Column field="publisher.name" header="Издательство"></Column>
  </DataTable>
</template>

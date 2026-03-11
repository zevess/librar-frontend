<script setup lang="ts">
import { Column, DataTable, type DataTableRowClickEvent } from 'primevue'
import type { IBook } from '../model/book.types'
import { StoredImage } from '@/shared/ui/stored-image'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'

defineProps<{
  books: IBook[]
}>()

const router = useRouter()

const onRowClick = (event: DataTableRowClickEvent) => {
  console.log(event.data)
  router.push(PUBLIC_URL.book(`${event.data.slug}-${event.data.id}`))
}
const rowClass = () => {
  return 'custom-row'
}
</script>
<template>
  <DataTable @row-click="onRowClick" :value="books" dataKey="id" :row-class="rowClass">
    <Column field="id" header="ID" style="width: 20%"> </Column>
    <Column field="title" header="Название"></Column>
    <Column field="image" header="Обложка">
      <template #body="slotProps">
        <StoredImage
          v-if="slotProps.data.image"
          :url="`${slotProps.data.image}`"
          class="max-w-24 rounded"
        />
      </template>
    </Column>
    <Column field="author.name" header="Автор"></Column>
    <Column field="category.name" header="Категория"></Column>
    <Column field="publisher.name" header="Издательство"></Column>
  </DataTable>
</template>

<style>
.custom-row {
  cursor: pointer;
}
.custom-row:hover {
  background-color: #f0f0f0;
}
</style>

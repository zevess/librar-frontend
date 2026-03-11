<script setup lang="ts">
import { Column, DataTable, type DataTableRowClickEvent } from 'primevue'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import type { IAuthor } from '../model/author.types'

defineProps<{
  authors: IAuthor[]
}>()

const router = useRouter()

const onRowClick = (event: DataTableRowClickEvent) => {
  console.log(event.data)
  router.push(PUBLIC_URL.author(`${event.data.slug}-${event.data.id}`))
}
const rowClass = () => {
  return 'custom-row'
}
</script>
<template>
  <DataTable @row-click="onRowClick" :value="authors" dataKey="id" :row-class="rowClass">
    <Column field="id" header="ID" style="width: 20%"> </Column>
    <Column field="name" header="Имя"></Column>
    <Column field="description" header="Описание"></Column>
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Column, DataTable, type DataTableRowEditSaveEvent } from 'primevue'
import { categoryData, type ICategory } from '../model/category.types'
import { Input } from '@/shared/ui/input'
import { useUpdateCategory } from '../api/useUpdateCategory'
import { useDeleteCategory } from '../api/useDeleteCategory'

defineProps<{
  categories: ICategory[]
}>()
const { deleteCategory } = useDeleteCategory()
const { updateCategory } = useUpdateCategory()

const editingRows = ref([])
const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const row = event.newData
  updateCategory({ data: row, categoryId: row.id })
}
const onRowDelete = (data: ICategory) => {
  const row = data
  deleteCategory(String(row.id))
}
</script>
<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="categories"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
  >
    <Column field="id" header="ID" style="width: 20%"> </Column>
    <Column field="name" header="Название">
      <template #editor="{ data, field }">
        <div class="flex items-center gap-4 justify-between w-full">
          <Input class="h-fit" v-model="data[field]" />
          <button @click="onRowDelete(data)">
            <span
              class="pi pi-trash p-3 hover:bg-red-500 cursor-pointer rounded-full transition"
            ></span>
          </button>
        </div> </template
    ></Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
  </DataTable>
</template>

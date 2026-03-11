<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import {
  Column,
  DataTable,
  useConfirm,
  type DataTableRowClickEvent,
  type DataTableRowEditSaveEvent,
} from 'primevue'

import { Input } from '@/shared/ui/input'
import type { IGenre } from '../model/genre.types'
import { useDeleteGenre } from '../api/useDeleteGenre'
import { useUpdateGenre } from '../api/useUpdateGenre'

defineProps<{
  genres: IGenre[]
}>()

const confirm = useConfirm()
const { deleteGenre } = useDeleteGenre()
const { updateGenre } = useUpdateGenre()

const editingRows = ref([])
const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const row = event.newData
  updateGenre({ data: row, genreId: row.id })
}
const onRowDelete = (data: IGenre) => {
  confirm.require({
    message: 'Вы уверены? Это действие необратимо.',
    header: 'Удалить жанр',
    icon: 'pi pi-trash',
    rejectLabel: 'Отмена',
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Удалить',
      severity: 'danger',
    },
    accept: () => {
      deleteGenre(String(data.id))
    },
  })
}
</script>
<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="genres"
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

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import {
  Column,
  DataTable,
  Tag,
  useConfirm,
  type DataTableRowClickEvent,
  type DataTableRowEditSaveEvent,
} from 'primevue'

import { Input } from '@/shared/ui/input'
import type { IGenre } from '../model/genre.types'
import { useDeleteGenre } from '../api/useDeleteGenre'
import { useUpdateGenre } from '../api/useUpdateGenre'
import { DeleteButton } from '@/features/delete-button'
import { useRowActions } from '@/shared/lib'
import { RestoreButton } from '@/features/restore-button'
import { TableEditorButton } from '@/shared/ui/table-editor-button'
import { useRestoreGenre } from '../api/useRestoreGenre'

defineProps<{
  genres: IGenre[]
}>()

const editingRows = ref([])
const { deleteGenre } = useDeleteGenre()
const { updateGenre } = useUpdateGenre()
const { restoreGenre } = useRestoreGenre()
const { onRowEditClose } = useRowActions(editingRows)

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const row = event.newData
  updateGenre({ data: row, genreId: row.id })
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
        </div> </template
    ></Column>
    <Column field="isDeleted" header="Статус">
      <template #body="{ data }">
        <Tag v-if="data.isDeleted" value="Удален" severity="danger" />
        <Tag v-if="!data.isDeleted" value="Доступна" severity="success" />
      </template>
    </Column>
    <Column style="width: 5%">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <DeleteButton
          v-if="!data.isDeleted"
          is-icon
          v-on:delete="
            () => {
              deleteGenre(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-header="Удалить жанр"
        />
        <RestoreButton
          v-if="data.isDeleted"
          is-icon
          v-on:restore="
            () => {
              restoreGenre(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-message="Вы уверены? Жанр будет восстановлен"
          confirm-header="Восстановить жанр"
        />
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:center">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <TableEditorButton icon="check" @click="editorSaveCallback" />
        <TableEditorButton icon="times" @click="editorCancelCallback" />
      </template>
    </Column>
  </DataTable>
</template>

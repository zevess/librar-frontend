<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Column, DataTable, Tag, type DataTableRowEditSaveEvent } from 'primevue'
import { categoryData, type ICategory } from '../model/category.types'
import { Input } from '@/shared/ui/input'
import { useUpdateCategory } from '../api/useUpdateCategory'
import { useDeleteCategory } from '../api/useDeleteCategory'
import { DeleteButton } from '@/features/delete-button'
import { useRowActions } from '@/shared/lib'
import { useRestoreCategory } from '../api/useRestoreCategory'
import { TableEditorButton } from '@/shared/ui/table-editor-button'
import { RestoreButton } from '@/features/restore-button'

defineProps<{
  categories: ICategory[]
}>()

const editingRows = ref([])
const { deleteCategory } = useDeleteCategory()
const { updateCategory } = useUpdateCategory()
const { restoreCategory } = useRestoreCategory()
const { onRowEditClose } = useRowActions(editingRows)

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const row = event.newData
  updateCategory({ data: row, categoryId: row.id })
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
              deleteCategory(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-header="Удалить категорию"
        />
        <RestoreButton
          v-if="data.isDeleted"
          is-icon
          v-on:restore="
            () => {
              restoreCategory(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-message="Вы уверены? Категория будет восстановлена"
          confirm-header="Восстановить категорию"
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

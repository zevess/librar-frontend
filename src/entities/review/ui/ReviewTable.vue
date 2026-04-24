<script setup lang="ts">
import { Column, DataTable, Tag, type DataTableRowEditSaveEvent } from 'primevue'

import { RouterLink } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { ref } from 'vue'
import { useRowActions } from '@/shared/lib'
import { RestoreButton } from '@/features/restore-button'
import { DeleteButton } from '@/features/delete-button'
import { TableEditorButton } from '@/shared/ui/table-editor-button'
import type { IReview } from '../model/review.types'
import { useDeleteReview } from '../api/useDeleteReview'
import { useRestoreReview } from '../api/useRestoreReview'
import { useUpdateReview } from '../api/useUpdateReview'
import { Textarea } from '@/shared/ui/textarea'

defineProps<{
  reviews: IReview[]
}>()

const editingRows = ref<IReview[]>([])
const { deleteReview } = useDeleteReview()
const { restoreReview } = useRestoreReview()
const { updateReview } = useUpdateReview()

const { onRowEditClose } = useRowActions(editingRows)
const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const row = event.newData
  updateReview({ data: row, reviewId: row.id })
}
</script>
<template>
  <DataTable
    @row-edit-save="onRowEditSave"
    v-model:editingRows="editingRows"
    editMode="row"
    dataKey="id"
    :value="reviews"
  >
    <Column field="id" header="ID" style="width: 5%"> </Column>
    <Column field="text" header="Текст">
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]"> </Textarea>
      </template>
    </Column>
    <Column field="book" header="Книга">
      <template #body="{ data }">
        <RouterLink
          class="hover:underline"
          :to="PUBLIC_URL.book(`${data.book.slug}-${data.book.id}`)"
          >{{ data.book.title }}</RouterLink
        >
      </template>
    </Column>
    <Column field="user.email" header="Пользователь"></Column>
    <Column field="isDeleted" header="Статус">
      <template #body="{ data }">
        <Tag v-if="data.isDeleted" value="Удален" severity="danger" />
        <Tag v-if="!data.isDeleted" value="Доступна" severity="success" />
      </template>
    </Column>
    <Column style="width: 5%">
      <template #editor="{ data }">
        <DeleteButton
          v-if="!data.isDeleted"
          is-icon
          v-on:delete="
            () => {
              deleteReview(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-header="Удалить отзыв"
        />
        <RestoreButton
          v-if="data.isDeleted"
          is-icon
          v-on:restore="
            () => {
              restoreReview(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-message="Вы уверены? Отзыв будет восстановлен "
          confirm-header="Восстановить отзыв"
        />
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:center">
      <template #editor="{ editorCancelCallback, editorSaveCallback }">
        <TableEditorButton icon="check" @click="editorSaveCallback" />
        <TableEditorButton icon="times" @click="editorCancelCallback" />
      </template>
    </Column>
  </DataTable>
</template>

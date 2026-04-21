<script setup lang="ts">
import { Column, DataTable, Tag, type DataTableRowClickEvent } from 'primevue'
import type { IBook } from '../model/book.types'
import { StoredImage } from '@/shared/ui/stored-image'
import { RouterLink, useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { useDeleteBook } from '../api/useDeleteBook'
import { useRestoreBook } from '../api/useRestoreBook'
import { ref } from 'vue'
import { useRowActions } from '@/shared/lib'
import { RestoreButton } from '@/features/restore-button'
import { DeleteButton } from '@/features/delete-button'
import { SettingButton } from '@/shared/ui/setting-button'
import { TableEditorButton } from '@/shared/ui/table-editor-button'

defineProps<{
  books: IBook[]
}>()

const router = useRouter()
const { deleteBook } = useDeleteBook()
const { restoreBook } = useRestoreBook()
const editingRows = ref<IBook[]>([])
const { onRowEditClose } = useRowActions(editingRows)
</script>
<template>
  <DataTable v-model:editingRows="editingRows" editMode="row" dataKey="id" :value="books">
    <Column field="id" header="ID" style="width: 5%"> </Column>
    <Column field="title" header="Название">
      <template #body="{ data }">
        <RouterLink class="hover:underline" :to="PUBLIC_URL.book(`${data.slug}-${data.id}`)">{{
          data.title
        }}</RouterLink>
      </template>
    </Column>
    <Column field="image" header="Обложка">
      <template #body="{ data }">
        <StoredImage v-if="data.image" :url="`${data.image}`" class="max-w-24 rounded" />
      </template>
    </Column>
    <Column field="author.name" header="Автор"></Column>
    <Column field="category.name" header="Категория"></Column>
    <Column field="publisher.name" header="Издательство"></Column>
    <Column field="isDeleted" header="Статус">
      <template #body="{ data }">
        <Tag v-if="data.isDeleted" value="Удален" severity="danger" />
        <Tag v-if="!data.isDeleted" value="Доступна" severity="success" />
      </template>
    </Column>
    <Column style="width: 5%">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <SettingButton
          v-if="!data.isDeleted"
          icon-size="base"
          :to="PUBLIC_URL.adminBookEdit(`${data.slug}-${data.id}`)"
        />
      </template>
    </Column>
    <Column style="width: 5%">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <DeleteButton
          v-if="!data.isDeleted"
          is-icon
          v-on:delete="
            () => {
              deleteBook(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-header="Удалить автора"
        />
      </template>
    </Column>
    <Column style="width: 5%">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <RestoreButton
          v-if="data.isDeleted"
          is-icon
          v-on:restore="
            () => {
              restoreBook(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-message="Вы уверены? Книга будет восстановлена со всеми данными"
          confirm-header="Восстановить книгу"
        />
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 5%; min-width: 8rem" bodyStyle="text-align:center">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <TableEditorButton icon="times" @click="editorCancelCallback" />
      </template>
    </Column>
  </DataTable>
</template>

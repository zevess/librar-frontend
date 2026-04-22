<script setup lang="ts">
import { Column, DataTable, Tag } from 'primevue'
import { RouterLink } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import type { IAuthor } from '../model/author.types'
import { TableEditorButton } from '@/shared/ui/table-editor-button'
import { RestoreButton } from '@/features/restore-button'
import { ref } from 'vue'
import { useRowActions } from '@/shared/lib'
import { useRestoreAuthor } from '../api/useRestoreAuthor'
import { useDeleteAuthor } from '../api/useDeleteAuthor'
import { DeleteButton } from '@/features/delete-button'
import { SettingButton } from '@/shared/ui/setting-button'

defineProps<{
  authors: IAuthor[]
}>()

const { deleteAuthor } = useDeleteAuthor()
const { restoreAuthor } = useRestoreAuthor()

const editingRows = ref<IAuthor[]>([])
const { onRowEditClose } = useRowActions(editingRows)
</script>
<template>
  <DataTable v-model:editingRows="editingRows" editMode="row" dataKey="id" :value="authors">
    <Column field="id" header="ID" style="width: 5%">
      <template #body="{ data }">
        <RouterLink :to="PUBLIC_URL.author(`${data.slug}-${data.id}`)">{{ data.id }}</RouterLink>
      </template>
    </Column>
    <Column field="name" header="Имя">
      <template #body="{ data }">
        <RouterLink :to="PUBLIC_URL.author(`${data.slug}-${data.id}`)">{{ data.name }}</RouterLink>
      </template>
    </Column>
    <Column
      field="description"
      header="Описание"
      style="width: 15%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
    ></Column>
    <Column field="isDeleted" header="Статус">
      <template #body="{ data }">
        <Tag v-if="data.isDeleted" value="Удален" severity="danger" />
        <Tag v-if="!data.isDeleted" value="Активен" severity="success" />
      </template>
    </Column>
    <Column style="width: 5%">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <SettingButton
          v-if="!data.isDeleted"
          icon-size="base"
          :to="PUBLIC_URL.adminAuthorEdit(`${data.slug}-${data.id}`)"
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
              deleteAuthor(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-header="Удалить автора"
        />
        <RestoreButton
          v-if="data.isDeleted"
          is-icon
          v-on:restore="
            () => {
              restoreAuthor(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-message="Вы уверены? Автор будет восстановлен со всеми данными"
          confirm-header="Восстановить автора"
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

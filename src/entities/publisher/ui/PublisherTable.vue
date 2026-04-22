<script setup lang="ts">
import { Column, DataTable, Tag, type DataTableRowClickEvent } from 'primevue'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import type { IPublisher } from '../model/publisher.types'
import { ref } from 'vue'
import { useRowActions } from '@/shared/lib'
import { useRestorePublisher } from '../api/useRestorePublisher'
import { useDeletePublisher } from '../api/useDeletePublisher'
import { SettingButton } from '@/shared/ui/setting-button'
import { DeleteButton } from '@/features/delete-button'
import { RestoreButton } from '@/features/restore-button'
import { TableEditorButton } from '@/shared/ui/table-editor-button'

defineProps<{
  publishers: IPublisher[]
}>()

const { deletePublisher } = useDeletePublisher()
const { restorePublisher } = useRestorePublisher()

const router = useRouter()
const editingRows = ref<IPublisher[]>([])
const { onRowEditClose } = useRowActions(editingRows)

const onRowClick = (event: DataTableRowClickEvent) => {
  router.push(PUBLIC_URL.publisher(`${event.data.slug}-${event.data.id}`))
}
</script>
<template>
  <DataTable v-model:editingRows="editingRows" editMode="row" :value="publishers" dataKey="id">
    <Column field="id" header="ID" style="width: 20%"> </Column>
    <Column field="name" header="Название"></Column>
    <Column field="description" header="Описание"></Column>
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
          :to="PUBLIC_URL.adminPublisherEdit(`${data.slug}-${data.id}`)"
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
              deletePublisher(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-header="Удалить издателя"
        />
        <RestoreButton
          v-if="data.isDeleted"
          is-icon
          v-on:restore="
            () => {
              restorePublisher(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-message="Вы уверены? Издатель будет восстановлен со всеми данными"
          confirm-header="Восстановить издателя"
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

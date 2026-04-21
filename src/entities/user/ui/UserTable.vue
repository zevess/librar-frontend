<script setup lang="ts">
import {
  Column,
  DataTable,
  Tag,
  type DataTableRowClickEvent,
  type DataTableRowEditSaveEvent,
} from 'primevue'
import { IUserRole, roleArray, type IUser } from '../model/user.types'
import { ref } from 'vue'
import { useUpdateUser } from '../api/useUpdateUser'
import { Input } from '@/shared/ui/input'
import { PrimeSelect } from '@/shared/ui/select'
import { useDeleteUser } from '../api/useDeleteUser'
import { DeleteButton } from '@/features/delete-button'
import { useRestoreUser } from '../api/useRestoreUser'
import { RestoreButton } from '@/features/restore-button'
import { TableEditorButton } from '@/shared/ui/table-editor-button'
import { useRowActions } from '@/shared/lib'

defineProps<{
  users: IUser[]
}>()

const { updateUser } = useUpdateUser()
const { deleteUser } = useDeleteUser()
const { restoreUser } = useRestoreUser()

const editingRows = ref<IUser[]>([])

const { onRowEditClose } = useRowActions(editingRows)

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  updateUser({ data: event.newData, userId: event.newData.id })
}
</script>
<template>
  <DataTable
    v-model:editingRows="editingRows"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
    :value="users"
  >
    <Column field="id" header="ID" style="width: 5%"> </Column>
    <Column field="name" header="Имя">
      <template #editor="{ data, field }">
        <Input v-if="!data.isDeleted" class="h-fit" v-model="data[field]" />
        <span v-if="data.isDeleted">{{ data.name }}</span>
      </template>
    </Column>
    <Column field="email" header="Почта"></Column>
    <Column field="isVerified" header="Подтвержден">
      <template #body="{ data }">
        <span v-if="data.isVerified" class="pi pi-verified"></span>
        <span v-if="!data.isVerified" class="pi pi-times-circle"></span>
      </template>
    </Column>
    <Column field="isDeleted" header="Статус">
      <template #body="{ data }">
        <Tag v-if="data.isDeleted" value="Удален" severity="danger" />
        <Tag v-if="!data.isDeleted" value="Активен" severity="success" />
      </template>
    </Column>
    <Column field="role" header="Роль">
      <template #body="{ data }">
        {{ IUserRole[data.role as keyof typeof IUserRole] }}
      </template>
      <template #editor="{ data, field }">
        <div class="flex items-center gap-4 justify-between w-full">
          <PrimeSelect
            v-if="!data.isDeleted"
            class="w-full"
            option-label="label"
            option-value="value"
            v-model="data[field]"
            :options="roleArray"
            placeholder="роль"
          />
          <span v-if="data.isDeleted">{{ IUserRole[data.role as keyof typeof IUserRole] }}</span>
          <DeleteButton
            v-if="!data.isDeleted"
            is-icon
            v-on:delete="
              () => {
                deleteUser(String(data.id))
                onRowEditClose(data)
              }
            "
            confirm-header="Удалить пользователя"
          />
        </div>
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
      <template #editor="{ data, editorCancelCallback, editorSaveCallback }">
        <TableEditorButton v-if="!data.isDeleted" icon="check" @click="editorSaveCallback" />
        <RestoreButton
          v-if="data.isDeleted"
          is-icon
          v-on:restore="
            () => {
              restoreUser(String(data.id))
              onRowEditClose(data)
            }
          "
          confirm-header="Восстановить пользователя"
        />
        <TableEditorButton icon="times" @click="editorCancelCallback" />
      </template>
    </Column>
  </DataTable>
</template>

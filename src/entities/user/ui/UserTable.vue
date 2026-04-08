<script setup lang="ts">
import {
  Column,
  DataTable,
  useConfirm,
  type DataTableRowClickEvent,
  type DataTableRowEditSaveEvent,
} from 'primevue'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { IUserRole, roleArray, type IUser } from '../model/user.types'
import { ref } from 'vue'
import { useUpdateUser } from '../api/useUpdateUser'
import { Input } from '@/shared/ui/input'
import { PrimeSelect } from '@/shared/ui/select'
import { useDeleteUser } from '../api/useDeleteUser'
import { DeleteButton } from '@/features/delete-button'

defineProps<{
  users: IUser[]
}>()

const confirm = useConfirm()
const { updateUser } = useUpdateUser()
const { deleteUser } = useDeleteUser()

const editingRow = ref([])

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const row = event.newData
  updateUser({ data: row, userId: row.id })
}

const onRowDelete = (data: IUser) => {
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
      deleteUser(String(data.id))
    },
  })
}
</script>
<template>
  <DataTable
    v-model:editingRows="editingRow"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
    :value="users"
  >
    <Column field="id" header="ID" style="width: 20%"> </Column>
    <Column field="name" header="Имя">
      <template #editor="{ data, field }">
        <Input class="h-fit" v-model="data[field]" />
      </template>
    </Column>
    <Column field="email" header="Почта"></Column>
    <Column field="isVerified" header="Подтвержден">
      <template #body="{ data }">
        <span v-if="data.isVerified" class="pi pi-verified"></span>
        <span v-if="!data.isVerified" class="pi pi-times-circle"></span>
      </template>
    </Column>
    <Column field="role" header="Роль">
      <template #body="{ data }">
        {{ IUserRole[data.role as keyof typeof IUserRole] }}
      </template>
      <template #editor="{ data, field }">
        <div class="flex items-center gap-4 justify-between w-full">
          <PrimeSelect
            class="w-full"
            option-label="label"
            option-value="value"
            v-model="data[field]"
            :options="roleArray"
            placeholder="роль"
          />
          <button @click="onRowDelete(data)">
            <span
              class="pi pi-trash p-3 hover:bg-red-500 cursor-pointer rounded-full transition"
            ></span>
          </button>
        </div>
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
  </DataTable>
</template>

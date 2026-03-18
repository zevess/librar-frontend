<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Column, DataTable, Tag } from 'primevue'
import { IReservationStatus, type IReservation } from '../model/reservation.types'
import { StoredImage } from '@/shared/ui/stored-image'

defineProps<{
  reservations: IReservation[]
}>()
</script>
<template>
  <div class="card">
    <DataTable :value="reservations">
      <Column field="id" header="ID"></Column>
      <Column field="reservedBy.email" header="Пользователь"></Column>
      <Column field="book.id" header="ID книги"></Column>
      <Column field="book.title" header="Название книги">
        <template #body="slotprops">
          <span v-if="slotprops.data.book">{{ slotprops.data.book.title }}</span>
          <span v-else class="lowercase text-gray-500 select-none">Книга удалена</span>
        </template>
      </Column>
      <Column field="book.image" header="Обложка">
        <template #body="slotProps">
          <StoredImage
            v-if="slotProps.data.book"
            :url="`${slotProps.data.book.image}`"
            class="max-w-24 rounded"
          />
        </template>
      </Column>
      <Column field="expiresAt" header="Истекает в">
        <template #body="{ data }">
          {{ data.expiresAt !== null ? new Date(data.expiresAt).toLocaleDateString('ru-RU') : '-' }}
        </template>
      </Column>
      <Column field="issuedAt" header="Выдано">
        <template #body="{ data }">
          {{ data.issuedAt !== null ? new Date(data.issuedAt).toLocaleDateString('ru-RU') : '-' }}
        </template>
      </Column>
      <Column field="acceptedAt" header="Принято">
        <template #body="{ data }">
          {{
            data.acceptedAt !== null ? new Date(data.acceptedAt).toLocaleDateString('ru-RU') : '-'
          }}
        </template>
      </Column>
      <Column field="status" header="Статус">
        <template #body="slotprops">
          <span>{{
            IReservationStatus[slotprops.data.status as keyof typeof IReservationStatus]
          }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

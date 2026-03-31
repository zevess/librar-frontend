<script setup lang="ts">
import { Column, DataTable, Tag } from 'primevue'
import { IReservationStatus, type IReservation } from '../model/reservation.types'
import { StoredImage } from '@/shared/ui/stored-image'
import { getSeverity } from '@/shared/lib'

import { PUBLIC_URL } from '@/shared/config'
import { AcceptReservationButton } from '@/features/accept-reservation-button'
import { CancelReservationButton } from '@/features/cancel-reservation-button'
import { IssueReservationButton } from '@/features/issue-reservation-button'

defineProps<{
  reservations: IReservation[]
}>()
</script>
<template>
  <div class="card">
    <DataTable :value="reservations">
      <Column :sortable="true" field="id" header="ID"></Column>
      <Column :sortable="true" field="reservedBy.email" header="Пользователь"></Column>
      <Column :sortable="true" field="book.id" header="ID книги"></Column>
      <Column :sortable="true" field="book.title" header="Название книги">
        <template #body="slotprops">
          <RouterLink
            :to="PUBLIC_URL.book(`${slotprops.data.book.slug}-${slotprops.data.book.id}`)"
            v-if="slotprops.data.book"
            >{{ slotprops.data.book.title }}</RouterLink
          >
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
      <Column :sortable="true" field="expiresAt" header="Истекает в">
        <template #body="{ data }">
          {{ data.expiresAt !== null ? new Date(data.expiresAt).toLocaleDateString('ru-RU') : '-' }}
        </template>
      </Column>
      <Column :sortable="true" field="issuedAt" header="Выдано">
        <template #body="{ data }">
          {{ data.issuedAt !== null ? new Date(data.issuedAt).toLocaleDateString('ru-RU') : '-' }}
        </template>
      </Column>
      <Column :sortable="true" field="acceptedAt" header="Принято">
        <template #body="{ data }">
          {{
            data.acceptedAt !== null ? new Date(data.acceptedAt).toLocaleDateString('ru-RU') : '-'
          }}
        </template>
      </Column>
      <Column :sortable="true" field="status" header="Статус">
        <template #body="slotprops">
          <div class="flex flex-col gap-4">
            <Tag
              :value="IReservationStatus[slotprops.data.status as keyof typeof IReservationStatus]"
              :severity="getSeverity(slotprops.data.status)"
            />
            <IssueReservationButton
              :reservation-id="slotprops.data.id"
              v-if="slotprops.data.status === 'reserved'"
            />
            <CancelReservationButton
              :reservation-id="slotprops.data.id"
              v-if="slotprops.data.status === 'reserved'"
            />
            <AcceptReservationButton
              :reservation-id="slotprops.data.id"
              v-if="slotprops.data.status === 'issued'"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

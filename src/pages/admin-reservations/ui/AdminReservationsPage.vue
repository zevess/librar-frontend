<script setup lang="ts">
import { ReservationsTable, useGetReservations } from '@/entities/reservation'
import { CancelExpiredButton } from '@/features/cancel-expired-button'
import { useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { ReservationFilter } from '@/features/reservation-filter'
import { ActionButton } from '@/shared/ui/action-button'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'

const { params, bookId, id, email, status, applyFilter, clearFilter } = useFilter()
const { reservations, isReservationsFetching, isReservationsFetched } = useGetReservations(params)
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="брони" />
    <ConfirmDialog />
    <ReservationFilter
      v-model:book-id-filter="bookId"
      v-model:reservation-id-filter="id"
      v-model:status-filter="status"
      v-model:email-filter="email"
    />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ActionButton class="p-4" @click="clearFilter">Сбросить</ActionButton>
        <ActionButton class="p-4" @click="applyFilter">Применить</ActionButton>
      </div>
      <CancelExpiredButton class="p-4" />
    </div>
    <SkeletonTable v-if="isReservationsFetching && !reservations" />

    <ReservationsTable v-if="reservations" :reservations="reservations?.data" />
    <Message v-if="reservations?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</Message
    >
    <Pagination v-if="reservations" :meta="reservations?.meta" :links="reservations?.links" />
  </div>
</template>

<script setup lang="ts">
import { ReservationsTable, useGetReservations } from '@/entities/reservation'
import { CancelExpiredButton } from '@/features/cancel-expired-button'
import { ApplyButton, ClearButton, useFilter, useParams } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { ReservationFilter, useReservationParams } from '@/features/reservation-filter'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog, Toast } from 'primevue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { filter } = useFilter()
const { reservationParams } = useReservationParams()

watch(
  () => route.query,
  () => {
    reservationParams.value.id = route.query.id ? String(route.query.id) : ''
    reservationParams.value.bookId = route.query.bookId ? String(route.query.bookId) : ''
    reservationParams.value.status = route.query.status ? String(route.query.status) : ''
    reservationParams.value.email = route.query.email ? String(route.query.email) : ''
    reservationParams.value.page = Number(route.query.page)
  },
)

const { reservations, isReservationsFetching, isReservationsFetched } =
  useGetReservations(reservationParams)
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="брони" />
    <ConfirmDialog />
    <ReservationFilter
      v-model:book-id-filter="filter.bookId"
      v-model:reservation-id-filter="filter.id"
      v-model:status-filter="filter.status"
      v-model:email-filter="filter.email"
    />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ClearButton :filter="filter" />
        <ApplyButton :filter="filter" />
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

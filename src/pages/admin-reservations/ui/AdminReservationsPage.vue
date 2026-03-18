<script setup lang="ts">
import {
  AdminReservationCard,
  ReservationCard,
  ReservationsTable,
  useGetReservations,
} from '@/entities/reservation'
import { ApplyButton, ClearButton, useFilter, useParams } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { ReservationFilter } from '@/features/reservation-filter'
import { ActionButton } from '@/shared/ui/action-button'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const { filter } = useFilter()
const { params } = useParams()

watch(
  () => route.query,
  () => {
    params.value.id = route.query.id ? String(route.query.id) : ''
    params.value.bookId = route.query.bookId ? String(route.query.bookId) : ''
    params.value.status = route.query.status ? String(route.query.status) : ''
    params.value.user = route.query.user ? String(route.query.user) : ''
    params.value.page = Number(route.query.page)
  },
)

const { reservations } = useGetReservations(params.value)
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="брони" />
    <ReservationFilter
      v-model:book-id-filter="filter.bookId"
      v-model:reservation-id-filter="filter.id"
      v-model:status-filter="filter.status"
      v-model:user-filter="filter.user"
    />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <ApplyButton :filter="filter" />
      <ClearButton />
    </div>
    <ReservationsTable v-if="reservations" :reservations="reservations?.data" />
    <NotFound v-if="reservations?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</NotFound
    >
    <Pagination v-if="reservations" :meta="reservations?.meta" :links="reservations?.links" />
  </div>
</template>

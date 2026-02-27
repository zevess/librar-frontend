<script setup lang="ts">
import {
  IReservationStatus,
  reservationData,
  reservationStatus,
} from '@/entities/reservation/model/reservation.types'
import { AdminReservationCard, ReservationCard, ReservationsTable } from '@/entities/reservation'
import { ReservationFilter } from '@/features/reservation-filter'
import { PageTitle } from '@/shared/ui/page-title'
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="брони" />
    <ReservationFilter />
    <ReservationsTable />
    <!-- <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <AdminReservationCard />
      <AdminReservationCard />
      <AdminReservationCard />
    </div> -->
  </div>
</template>

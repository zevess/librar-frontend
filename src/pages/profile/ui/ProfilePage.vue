<script setup lang="ts">
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { useLogout, useProfile, useUserStore } from '@/entities/user'
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
import {
  type IReservation,
  ReservationsTable,
  useGetReservations,
  useGetUserReservations,
} from '@/entities/reservation'
import { IReservationStatus } from '@/entities/reservation'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { reservationService } from '@/entities/reservation/model/reservation.service'
import type { IPaginatedResponse } from '@/shared/api'
import { LogoutButton } from '@/shared/ui/logout-button'

const { profile, isFetching, isFetched, isSuccess } = useProfile()

const userId = computed(() => profile.value?.user?.id)

const { reservations, refetch } = useGetUserReservations(userId)
</script>

<template>
  <PageSkeleton v-if="isFetching && !profile" variant="profile" />
  <div v-if="isFetched" class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <div class="flex flex-col text-center">
        <PageTitle
          v-if="profile?.user"
          :title="profile?.user.name"
          class="text-center md:text-left"
        />
        <span>{{ profile?.user.email }}</span>
      </div>

      <PageSubtitle title="профиль" />
    </div>
    <span class="text-xl uppercase font-semibold">Все брони:</span>
    <ReservationsTable v-if="reservations" :reservations="reservations.data" />

    <LogoutButton />
  </div>
</template>

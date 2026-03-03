<script setup lang="ts">
import { authorData, type IAuthor } from '@/entities/author/model/author.types'
import { bookData } from '@/entities/book/model/book.types'
import { reservationData } from '@/entities/reservation/model/reservation.types'
import { ReservationCard } from '@/entities/reservation'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { useLogout, useProfile, useUserStore } from '@/entities/user'
import { Skeleton } from 'primevue'
import ProfilePageSkeleton from './ProfileSkeleton.vue'
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'

const book = bookData[0]
const reservation = reservationData

const { profile, isFetching, isFetched, isSuccess } = useProfile()
const { logout } = useLogout()
const router = useRouter()

const handleLogoutClick = () => {
  logout()
  router.replace('/')
}

const { user, token } = useUserStore()
</script>

<template>
  <ProfilePageSkeleton v-if="!profile?.user" />
  <div v-if="isFetched" class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle
        v-if="profile?.user"
        :title="profile?.user.name"
        class="text-center md:text-left mb-2"
      />
      <PageSubtitle title="профиль" />
    </div>
    <span class="text-xl">Активные брони:</span>
    <!-- <div class="flex">
      <div class="flex flex-col w-fit relative">
        <span class="text-center font-semibold">Забрать до 01.03.2026</span>
        <BookCard :book="book" />
      </div>
      <div class="flex flex-col w-fit relative">
        <span class="text-center font-semibold">Выдано</span>
        <BookCard :book="book" />
      </div>
    </div> -->

    <span class="text-xl">Завершенные брони:</span>
    <div class="flex">
      <!-- <ReservationCard :reservation="reservationData" /> -->
      <!-- <div class="flex flex-col w-fit relative">
        <span class="text-center font-semibold">Принято</span>
        <BookCard :book="book" />
      </div>
      <div class="flex flex-col w-fit relative">
        <span class="text-center font-semibold">Принято</span>
        <BookCard :book="book" />
      </div> -->
    </div>

    <!-- <BookList :items="bookData" variant="default" /> -->
    <span class="text-xl">Уведомления:</span>
    <ActionButton
      @click="handleLogoutClick"
      title="Выйти"
      class="w-fit p-3 flex items-center gap-2"
    >
      <span class="pi pi-sign-out"></span>
    </ActionButton>
  </div>
</template>

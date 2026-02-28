<script setup lang="ts">
import { authorData, type IAuthor } from '@/entities/author/model/author.types'
import { bookData } from '@/entities/book/model/book.types'

import { reservationData } from '@/entities/reservation/model/reservation.types'
import { ReservationCard } from '@/entities/reservation'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { useUserStore } from '@/stores/counter'
import { onMounted } from 'vue'
import { getAccessToken } from '@/entities/auth/model/auth.token'
import { useProfile } from '@/entities/user'
const book = bookData[0]
const reservation = reservationData

const { profile } = useProfile()
console.log(profile)

// const { user } = useUserStore()
// console.log(user)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle :title="profile?.user.name" class="text-center md:text-left mb-2" />
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
  </div>
</template>

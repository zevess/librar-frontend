<script setup lang="ts">
import { authorData, type IAuthor } from '@/entities/author/model/author.types'
import { bookData } from '@/entities/book/model/book.types'
import { BookCard } from '@/entities/book/ui/book-card'
import { BookList } from '@/entities/book/ui/book-list'
import { reservationData } from '@/entities/reservation/model/reservation.types'
import { ReservationCard } from '@/entities/reservation'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
// defineProps<IAuthor>()
const book = bookData[0]
const reservation = reservationData
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle title="имя пользователя" class="text-center md:text-left mb-2" />
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
      <ReservationCard :reservation="reservationData" />
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

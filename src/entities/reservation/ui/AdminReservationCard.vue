<script setup lang="ts">
import { PUBLIC_URL } from '@/shared/config/url.config'
import { RouterLink } from 'vue-router'
import { IReservationStatus, reservationData } from '../model/reservation.types'
import { ActionButton } from '@/shared/ui/action-button'
const reservation = reservationData[0]
</script>

<template>
  <div class="flex flex-wrap justify-around w-full gap-4 p-4 border border-gray-300 rounded-md">
    <div class="w-36 sm:w-48">
      <div class="w-full aspect-2/3 overflow-hidden rounded">
        <img :src="reservation?.book.image" class="w-full h-full object-contain" alt="" />
      </div>
      <div class="flex flex-col gap-1 w-full">
        <span :title="reservation?.book?.title" class="mt-2 text-base/tight line-clamp-2">{{
          reservation?.book?.title
        }}</span>
        <span class="text-xs text-gray-500">{{ reservation?.book?.author }}</span>
      </div>
    </div>
    <div class="flex flex-col text-left gap-2">
      <div class="flex items-center gap-2">
        <span class="font-semibold">ID:</span>
        <span class="uppercase text-xl bg-[#d1ebe9] p-1 px-2">12</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-semibold">Статус:</span>
        <span class="uppercase text-xl bg-[#d1ebe9] p-1 px-2">{{
          IReservationStatus.RESERVED
        }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-semibold">ID книги:</span>
        <span>8</span>
      </div>
      <div class="flex gap-2">
        <span class="text-left font-semibold">ID пользователя:</span>
        <span title="имя пользователя">имя пользователя</span>
      </div>
      <div class="flex gap-2">
        <span class="font-semibold">Дата брони:</span>
        <span title="имя пользователя">17.03.2026</span>
      </div>
      <div class="flex gap-2">
        <span class="font-semibold">Истекает:</span>
        <span title="имя пользователя">20.03.2026</span>
      </div>
      <ActionButton :disabled="reservation?.status == IReservationStatus.ISSUED" title="Выдать" />
      <ActionButton :disabled="reservation?.status == IReservationStatus.ISSUED" title="Отменить" />
      <ActionButton :disabled="reservation?.status == IReservationStatus.ISSUED" title="Принять" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { statusArray } from '@/entities/reservation'
import { Input } from '@/shared/ui/input'
import { PrimeSelect } from '@/shared/ui/select'

const reservationIdFilter = defineModel<string | null>('reservationIdFilter')
const emailFilter = defineModel<string | null>('emailFilter')
const bookIdFilter = defineModel<string | null>('bookIdFilter')
const statusFilter = defineModel<string | null>('statusFilter')
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id:</label>
      <Input v-model="reservationIdFilter" placeholder="найти..." class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">email пользователя:</label>
      <Input v-model="emailFilter" placeholder="найти..." class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id книги:</label>
      <Input v-model="bookIdFilter" placeholder="найти..." class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">статус:</label>
      <PrimeSelect
        class="w-full"
        option-label="label"
        option-value="value"
        v-model="statusFilter"
        :options="statusArray"
        placeholder="статус"
      />
    </div>
  </div>
</template>

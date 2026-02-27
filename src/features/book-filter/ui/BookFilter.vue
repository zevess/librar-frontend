<script setup lang="ts">
import { reservationStatus } from '@/entities/reservation/model/reservation.types'
import { Input } from '@/shared/ui/input'

import { PrimeSelect } from '@/shared/ui/select'
import { ref } from 'vue'
const selectedCity = ref()
const cities = ref(reservationStatus)
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id книги:</label>
      <Input placeholder="id" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">название книги или имя автора:</label>
      <Input placeholder="id" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id автора:</label>
      <Input placeholder="id" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id издательства:</label>
      <Input placeholder="id" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id жанров:</label>
      <Input placeholder="id" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">тип:</label>
      <PrimeSelect
        class="w-full"
        option-label="name"
        v-model="selectedCity"
        :options="cities"
        placeholder="тип"
      />
    </div>
  </div>
</template>

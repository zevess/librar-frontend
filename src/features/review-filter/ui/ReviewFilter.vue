<script setup lang="ts">
import { Input } from '@/shared/ui/input'
const reviewIdFilter = defineModel<string | null>('reviewIdFilter')
const emailFilter = defineModel<string | null>('emailFilter')
const queryFilter = defineModel<string | null>('queryFilter')
const bookIdFilter = defineModel<string | null>('bookIdFilter')
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id отзыва:</label>
      <Input v-model="reviewIdFilter" placeholder="найти..." class="w-full" />
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
      <label class="text-sm font-medium text-gray-700">текст отзыва:</label>
      <Input v-model="queryFilter" placeholder="найти..." class="w-full" />
    </div>
  </div>
</template>

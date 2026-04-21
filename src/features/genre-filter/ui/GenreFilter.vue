<script setup lang="ts">
import { Input } from '@/shared/ui/input'

const genreIdFilter = defineModel<string | null>('genreIdFilter')
const queryFilter = defineModel<string | null>('queryFilter')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">id жанра:</label>
        <Input v-model="genreIdFilter" placeholder="найти..." class="w-full" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">название жанра:</label>
        <Input v-model="queryFilter" placeholder="найти..." class="w-full" />
      </div>
    </div>
  </div>
</template>

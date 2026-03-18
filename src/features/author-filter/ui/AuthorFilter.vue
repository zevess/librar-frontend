<script setup lang="ts">
import { Input } from '@/shared/ui/input'

const authorIdFilter = defineModel<string | null>('authorIdFilter')
const queryFilter = defineModel<string | null>('queryFilter')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">id автора:</label>
        <Input v-model="authorIdFilter" placeholder="найти..." class="w-full" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">имя автора:</label>
        <Input v-model="queryFilter" placeholder="найти..." class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/shared/ui/input'
const publisherIdFilter = defineModel<string | null>('publisherIdFilter')
const queryFilter = defineModel<string | null>('queryFilter')
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id издательства:</label>
      <Input v-model="publisherIdFilter" placeholder="найти..." class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">название издательства:</label>
      <Input v-model="queryFilter" placeholder="найти..." class="w-full" />
    </div>
  </div>
</template>

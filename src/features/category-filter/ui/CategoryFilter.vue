<script setup lang="ts">
import { Input } from '@/shared/ui/input'

const categoryIdFilter = defineModel<string | null>('categoryIdFilter')
const queryFilter = defineModel<string | null>('queryFilter')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">id категории:</label>
        <Input v-model="categoryIdFilter" placeholder="найти..." class="w-full" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">название категории:</label>
        <Input v-model="queryFilter" placeholder="найти..." class="w-full" />
      </div>
    </div>
  </div>
</template>

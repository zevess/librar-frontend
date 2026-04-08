<script setup lang="ts">
import { roleArray } from '@/entities/user'
import { Input } from '@/shared/ui/input'
import { PrimeSelect } from '@/shared/ui/select'
const userIdFilter = defineModel<string | null>('userIdFilter')
const queryFilter = defineModel<string | null>('queryFilter')
const emailFilter = defineModel<string | null>('emailFilter')
const roleFilter = defineModel<string | null>('roleFilter')
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">id пользователя:</label>
      <Input v-model="userIdFilter" placeholder="найти..." class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">имя пользователя:</label>
      <Input v-model="queryFilter" placeholder="найти..." class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">email пользователя:</label>
      <Input v-model="emailFilter" placeholder="найти..." class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-gray-700">роль:</label>
      <PrimeSelect
        class="w-full"
        option-label="label"
        option-value="value"
        v-model="roleFilter"
        :options="roleArray"
        placeholder="роль"
      />
    </div>
  </div>
</template>

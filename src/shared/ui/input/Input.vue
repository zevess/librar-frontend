<script setup lang="ts">
import { IconButton } from '../icon-button'
defineProps<{
  placeholder?: string
  withLabel?: boolean
  label?: string
  type?: 'number' | 'text' | 'password'
}>()
const model = defineModel()
</script>

<template>
  <!-- <label class="text-gray-500" v-if="withLabel" :for="String(model)">{{ label }}</label> -->
  <input
    :type="type"
    v-model="model"
    :placeholder="placeholder"
    class="w-full h-12 border-box rounded-md p-2 bg-gray-50 outline-2 outline-[#d1ebe9] focus:outline-[#a4c8c6] -outline-offset-2 transition"
  />
</template>

<script setup lang="ts">
import { IconButton } from '../icon-button'
defineProps<{
  placeholder: string
}>()
const model = defineModel()
</script>

<template>
  <input
    v-model="model"
    :placeholder="placeholder"
    type="text"
    class="border-2 w-full h-12 border-[#d1ebe9] rounded-md p-2 bg-gray-50 focus:border-[#a4c8c6] focus:outline-0 focus:border-r-2"
  />
</template>
<!-- bg-[#d1ebe9] hover:bg-[#bededc] -->

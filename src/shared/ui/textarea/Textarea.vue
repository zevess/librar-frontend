<script setup lang="ts">
defineProps<{
  placeholder?: string
  withLabel?: boolean
  label?: string
}>()
const model = defineModel<string>()
</script>
<template>
  <textarea
    v-model="model"
    :placeholder="placeholder"
    class="border-2 w-full field-sizing-content border-[#d1ebe9] rounded-md p-2 bg-gray-50 focus:border-[#a4c8c6] focus:outline-0 focus:border-r-2 transition"
  />
</template>

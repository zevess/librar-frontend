<script setup lang="ts">
defineProps<{
  placeholder: string
  withLabel?: boolean
  label?: string
}>()
const model = defineModel<string>()
</script>
<template>
  <!-- <label class="text-gray-500" v-if="withLabel" :for="String(model)">{{ label }}</label> -->

  <textarea
    v-model="model"
    :placeholder="placeholder"
    class="border-2 w-full h-12 border-[#d1ebe9] rounded-md p-2 bg-gray-50 focus:border-[#a4c8c6] focus:outline-0 focus:border-r-2"
  />
</template>
<!-- v-model="value" rows="5" cols="30" -->

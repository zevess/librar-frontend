<script setup lang="ts">
// import { ref } from 'vue'
// const value = ref('')
defineProps<{
  placeholder: string
}>()
</script>
<template>
  <Textarea
    :placeholder="placeholder"
    class="border-2 w-full h-12 border-[#d1ebe9] rounded-md p-2 bg-gray-50 focus:border-[#a4c8c6] focus:outline-0 focus:border-r-2"
  />
</template>
<!-- v-model="value" rows="5" cols="30" -->

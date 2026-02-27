<script setup lang="ts">
import { Select } from 'primevue'
import { ref } from 'vue'
defineProps<{
  placeholder?: string
  optionLabel?: string
}>()
</script>
<template>
  <Select :optionLabel="optionLabel" :placeholder="placeholder" class="custom-select border-2" />
</template>
<style scoped>
.custom-select {
  --p-select-background: #f9fafb; /* bg-gray-50 */
  --p-select-color: #000000; /* text-black */
  --p-select-border-color: #d1ebe9;
  --p-select-border-radius: 0.375rem; /* rounded-md */
  --p-select-height: 3rem; /* h-12 */
  --p-select-focus-border-color: #a4c8c6;

  border-width: 2px;
  padding: 2px;
}

.p-select:not(.p-disabled):hover {
  border-color: #a4c8c6;
}
</style>
<!-- w-full h-12! flex items-center md:w-56 border-2! border-[#d1ebe9]! rounded-md bg-gray-50! checked:border-[#a4c8c6]! text-black -->

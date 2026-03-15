<script setup lang="ts">
import { MultiSelect } from 'primevue'

defineProps<{
  optionLabel: string
  optionValue: string
  placeholder: string
}>()
</script>

<template>
  <MultiSelect
    :optionLabel="optionLabel"
    filter
    :option-value="optionValue"
    :placeholder="placeholder"
    class="custom-multiselect w-full"
  />
</template>
<style scoped>
.custom-multiselect {
  --p-multiselect-background: #f9fafb;
  --p-multiselect-color: #000000;
  --p-multiselect-border-color: #d1ebe9;
  --p-multiselect-border-radius: 0.375rem;
  --p-multiselect-height: 3rem;
  --p-multiselect-focus-border-color: #a4c8c6;

  border-width: 2px;
  padding: 2px;
}

.p-multiselect:not(.p-disabled):hover {
  border-color: #a4c8c6;
}
</style>

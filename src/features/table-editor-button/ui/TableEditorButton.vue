<script setup lang="ts">
defineProps<{
  icon: string
}>()
</script>

<template>
  <button
    class="p-button p-component p-button-icon-only p-button-secondary p-button-rounded p-button-text p-datatable-row-editor-init"
  >
    <span :class="[`pi pi-${icon}`]"></span>
  </button>
</template>

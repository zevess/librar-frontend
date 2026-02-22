<script setup lang="ts">
defineProps({
  icon: String,
})
</script>

<template>
  <button
    class="size-12 rounded-md transition bg-[#d1ebe9] hover:bg-[#bededc] cursor-pointer"
    v-bind="$attrs"
  >
    <span :class="`pi pi-${icon}`"></span>
  </button>
</template>

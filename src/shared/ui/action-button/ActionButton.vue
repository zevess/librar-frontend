<script setup lang="ts">
defineProps({
  title: String,
  disabled: Boolean,
})
</script>

<template>
  <button
    :disabled="disabled"
    class="rounded-md transition bg-[#d1ebe9] hover:bg-[#bededc] p-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
  >
    <span class="text-center text-sm md:text-base">{{ title }}</span>
  </button>
</template>

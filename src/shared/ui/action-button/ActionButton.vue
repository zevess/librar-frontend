<script setup lang="ts">
defineProps<{
  title?: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    :disabled="disabled"
    class="rounded-md transition bg-[#d1ebe9] hover:bg-[#bededc] p-2 text-center text-sm md:text-base font-semibold cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
  >
    <slot></slot>
    {{ title }}
  </button>
</template>

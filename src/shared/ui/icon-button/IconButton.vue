<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    filled?: boolean
  }>(),
  {
    filled: true,
  },
)
</script>

<template>
  <button
    :class="[
      'size-12 rounded-md transition cursor-pointer',
      filled && 'bg-[#d1ebe9] hover:bg-[#bededc]',
    ]"
    v-bind="$attrs"
  >
    <span :class="`pi pi-${icon}`"></span>
  </button>
</template>

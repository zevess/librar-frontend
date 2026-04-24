<script setup lang="ts">
import { BookCardSkeleton } from '..'

const props = defineProps<{
  variant: 'default' | 'catalog'
}>()

const styles: Record<'default' | 'catalog', string> = {
  default:
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center gap-4 sm:gap-6  p-2 md:p-4',
  catalog:
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-2 md:p-4',
}
</script>

<template>
  <div :class="styles[variant]">
    <BookCardSkeleton v-for="n in 6" :key="n" />
  </div>
</template>

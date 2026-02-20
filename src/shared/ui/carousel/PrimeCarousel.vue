<script setup lang="ts">
import { BookCard } from '@/entities/book/ui/book-card'
import { Carousel } from 'primevue'
defineProps({
  values: Array,
})
</script>

<template>
  <Carousel :value="values" :numVisible="5" :numScroll="3">
    <template #item="slotProps">
      <BookCard :book="slotProps.data" />
    </template>
    <slot></slot>
  </Carousel>
</template>

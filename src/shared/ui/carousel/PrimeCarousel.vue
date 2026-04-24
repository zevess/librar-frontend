<script setup lang="ts">
import { Carousel } from 'primevue'
defineProps({
  values: Array,
})
</script>

<template>
  <Carousel :value="values" :numVisible="5" :numScroll="3">
    <template #item="slotProps"> </template>
    <slot></slot>
  </Carousel>
</template>

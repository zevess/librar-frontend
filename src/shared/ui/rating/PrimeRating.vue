<script setup lang="ts">
import { Rating } from 'primevue'
import { ref } from 'vue'
defineProps({
  fontSize: String,
})
</script>

<template>
  <Rating>
    <template #onicon>
      <span class="pi pi-star-fill" :style="`color: #ffc107; font-size: ${fontSize} `"></span>
    </template>
    <template #officon>
      <span class="pi pi-star" :style="`color: #ffc107; font-size: ${fontSize} `"></span>
    </template>
  </Rating>
</template>

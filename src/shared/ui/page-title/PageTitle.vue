<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<template>
  <h1 class="font-bold text-3xl uppercase my-4">{{ title }}</h1>
</template>

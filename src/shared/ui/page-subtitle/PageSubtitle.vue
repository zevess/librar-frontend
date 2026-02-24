<script setup lang="ts">
import { PageTitle } from '../page-title'

defineProps<{
  title?: string
}>()
</script>

<template>
  <PageTitle :title="title" class="text-center text-black/30 select-none text-2xl!" />
</template>

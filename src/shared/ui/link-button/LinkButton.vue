<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ActionButton } from '../action-button'

defineProps<{
  to: string
  text: string
}>()
</script>

<template>
  <RouterLink :to="to" class="w-full md:w-fit">
    <ActionButton :title="text" class="p-4 w-full" />
  </RouterLink>
</template>

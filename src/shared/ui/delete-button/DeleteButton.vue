<script setup lang="ts">
import { ActionButton } from '../action-button'

defineProps<{
  title: string
}>()

const emit = defineEmits(['delete'])
</script>

<template>
  <ActionButton
    :title
    class="w-fit border-2 border-red-400 text-red-400 bg-transparent hover:bg-red-400 hover:text-white"
    @click="emit('delete')"
  >
    <span class="pi pi-trash"></span>
  </ActionButton>
</template>

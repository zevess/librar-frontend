<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'

defineProps<{
  mode: 'create' | 'edit'
  createTitle?: string
  editTitle?: string
  disabled: boolean
}>()
</script>

<template>
  <ActionButton
    :disabled="disabled"
    type="submit"
    class="md:max-w-1/3 p-4 flex items-center gap-1"
    :title="mode === 'create' ? createTitle : editTitle"
  >
    <span v-if="mode === 'create'" class="pi pi-plus"></span>
    <span v-if="mode === 'edit'" class="pi pi-save"></span
  ></ActionButton>
</template>

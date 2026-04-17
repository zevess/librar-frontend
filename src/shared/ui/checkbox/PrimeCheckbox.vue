<script setup lang="ts">
import { Checkbox } from 'primevue'
defineProps<{
  inputId?: string
  name: string
  value?: string | number | null
  size?: 'small' | 'large'
  label: string
  binary?: boolean
}>()

const model = defineModel()
</script>
<template>
  <div class="flex items-center gap-2">
    <Checkbox
      v-model="model"
      :input-id="inputId"
      :name="name"
      :value="value"
      :size="size"
      :binary="binary"
      :pt="{
        box: ({ context }) => ({
          style: {
            backgroundColor: context.checked ? '#96d9d5' : '#ffffff',
            borderColor: context.checked ? '#96d9d5' : '#96d9d5',
          },
        }),
      }"
    />
    <label :for="inputId" class="cursor-pointer">{{ label }}</label>
  </div>
</template>

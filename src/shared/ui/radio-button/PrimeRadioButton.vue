<script setup lang="ts">
import { RadioButton } from 'primevue'
defineProps<{
  inputId: string
  name: string
  value: string
  size?: 'small' | 'large'
}>()
const model = defineModel()
</script>

<template>
  <div class="flex items-center gap-2">
    <RadioButton
      v-model="model"
      :inputId="inputId"
      :name="name"
      :value="value"
      :size="size"
      :pt="{
        box: ({ context }) => ({
          style: {
            backgroundColor: context.checked ? '#96d9d5' : '#ffffff',
            borderColor: context.checked ? '#96d9d5' : '#96d9d5',
          },
        }),
      }"
    />
    <label :for="inputId" class="cursor-pointer">{{ value }}</label>
  </div>
</template>

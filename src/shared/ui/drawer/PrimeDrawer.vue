<script setup lang="ts">
import { Button, Drawer } from 'primevue'
import { ref } from 'vue'
import { IconButton } from '../icon-button'
import { ActionButton } from '../action-button'
defineProps<{
  icon: string
  drawerName: string
  filled?: boolean
  showResults?: boolean
  resultsCount?: number
}>()

const visible = ref(false)
</script>

<template>
  <div class="card flex justify-center">
    <Drawer
      v-model:visible="visible"
      :header="drawerName"
      :pt="{
        content: {
          class: 'flex flex-col justify-between',
        },
      }"
    >
      <slot></slot>
      <ActionButton @click="visible = false" v-if="showResults" class="w-full mt-auto p-4"
        >Показать результаты {{ resultsCount }}</ActionButton
      >
    </Drawer>
    <IconButton :filled="filled" @click="visible = true" class="" :icon="icon" />
  </div>
</template>

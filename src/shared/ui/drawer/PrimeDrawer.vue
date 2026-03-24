<script setup lang="ts">
import { Button, Drawer } from 'primevue'
import { ref } from 'vue'
import { IconButton } from '../icon-button'
defineProps<{
  icon: string
  drawerName: string
}>()

const visible = ref(false)
</script>

<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" :header="drawerName">
      <slot></slot>
    </Drawer>

    <IconButton @click="visible = true" class="" :icon="icon" />
  </div>
</template>

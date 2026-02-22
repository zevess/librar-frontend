<script setup lang="ts">
import { Button, Drawer } from 'primevue'
import { ref } from 'vue'
import { IconButton } from '../icon-button'

const visible = ref(false)
defineProps<{
  icon: string
  drawerName: string
}>()
</script>

<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" :header="drawerName">
      <slot></slot>
    </Drawer>

    <IconButton @click="visible = true" class="" icon="filter" />
  </div>
</template>

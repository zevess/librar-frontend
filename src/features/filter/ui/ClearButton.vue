<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'

const router = useRouter()
const clearFilter = () => {
  router.replace({
    params: {},
  })
}
</script>

<template>
  <ActionButton @click="clearFilter" class="p-4" title="Очистить"></ActionButton>
</template>

<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
const router = useRouter()

const onClick = () => {
  router.back()
}
</script>

<template>
  <ActionButton
    @click="onClick"
    class="md:max-w-1/3 p-4 flex items-center gap-2"
    variant="outline"
    title="Назад"
  >
    <span class="pi pi-arrow-left"></span>
  </ActionButton>
</template>

<script setup lang="ts">
import { PUBLIC_URL } from '@/shared/config'
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = withDefaults(
  defineProps<{
    to?: 'adminBooks' | 'adminAuthors' | 'adminPublishers' | 'back'
  }>(),
  {
    to: 'back',
  },
)

const routes = {
  adminBooks: PUBLIC_URL.adminBooks(),
  adminAuthors: PUBLIC_URL.adminAuthors(),
  adminPublishers: PUBLIC_URL.adminPublishers(),
}

const onClick = () => {
  if (props.to === 'back') {
    router.back()
    return
  }
  const route = routes[props.to]
  if (route) router.push(route)
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

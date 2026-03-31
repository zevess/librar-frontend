<script setup lang="ts">
import { useLogout } from '@/entities/user'
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'

const { logout } = useLogout()
const router = useRouter()

const handleLogoutClick = () => {
  logout()
  router.replace('/')
}
</script>

<template>
  <ActionButton @click="handleLogoutClick" title="Выйти" class="w-fit p-3 flex items-center gap-2">
    <span class="pi pi-sign-out"></span>
  </ActionButton>
</template>

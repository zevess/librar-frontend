<script setup lang="ts">
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { useLogout, useProfile } from '@/entities/user'
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
import { PageSkeleton } from '@/shared/ui/page-skeleton'

const { profile, isFetching, isFetched, isSuccess } = useProfile()
const { logout } = useLogout()
const router = useRouter()

const handleLogoutClick = () => {
  logout()
  router.replace('/')
}
</script>

<template>
  <PageSkeleton v-if="isFetching && !profile" variant="profile" />
  <div v-if="isFetched" class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle
        v-if="profile?.user"
        :title="profile?.user.name"
        class="text-center md:text-left"
      />
      <PageSubtitle title="профиль" />
    </div>
    <span class="text-xl">Активные брони:</span>

    <span class="text-xl">Завершенные брони:</span>
    <div class="flex"></div>

    <span class="text-xl">Уведомления:</span>
    <ActionButton
      @click="handleLogoutClick"
      title="Выйти"
      class="w-fit p-3 flex items-center gap-2"
    >
      <span class="pi pi-sign-out"></span>
    </ActionButton>
  </div>
</template>

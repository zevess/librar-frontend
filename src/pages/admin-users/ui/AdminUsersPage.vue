<script setup lang="ts">
import { useGetUsers, useProfile, UserTable } from '@/entities/user'
import { useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { UserFilter } from '@/features/user-filter'
import { ActionButton } from '@/shared/ui/action-button'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'

const { profile } = useProfile()
const isAdmin = profile.value?.data.role === 'admin'
const { id, email, q, params, role, clearFilter, applyFilter } = useFilter()
const { users, isFetching } = useGetUsers(params, isAdmin)
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="пользователи" />
    <ConfirmDialog />
    <Message v-if="!isAdmin">Данная страница только для администратора</Message>
    <div v-if="isAdmin" class="flex flex-col gap-4">
      <UserFilter
        v-model:user-id-filter="id"
        v-model:email-filter="email"
        v-model:query-filter="q"
        v-model:role-filter="role"
      />
      <div class="flex justify-between gap-4">
        <ActionButton class="p-4" @click="clearFilter">Сбросить</ActionButton>
        <ActionButton class="p-4" @click="applyFilter">Применить</ActionButton>
      </div>
      <SkeletonTable v-if="isFetching && !users" />
      <UserTable v-if="users?.data" :users="users?.data" />
      <Message v-if="users?.data.length === 0"
        >Ничего не найдено. Попробуйте позже или измените запрос</Message
      >
      <Pagination v-if="users" :meta="users?.meta" :links="users?.links" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetUsers, useProfile, UserTable } from '@/entities/user'
import { ApplyButton, ClearButton, useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { UserFilter, useUserParams } from '@/features/user-filter'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const { profile } = useProfile()
const isAdmin = profile.value?.data.role === 'admin'

const route = useRoute()

const { filter } = useFilter()
const { userParams } = useUserParams()

watch(
  () => route.query,
  () => {
    userParams.value.q = route.query.q ? String(route.query.q) : ''
    userParams.value.email = route.query.email ? String(route.query.email) : ''
    userParams.value.role = route.query.role ? String(route.query.role) : ''
    userParams.value.id = route.query.id ? String(route.query.id) : ''
    userParams.value.page = Number(route.query.page)
  },
)

const { users, isFetching } = useGetUsers(userParams.value, isAdmin)
</script>

<template>
  <div class="flex flex-col gap-4">
    <ConfirmDialog />
    <PageTitle title="пользователи" />
    <Message v-if="!isAdmin">Данная страница только для администратора</Message>
    <div v-if="isAdmin" class="flex flex-col gap-4">
      <UserFilter
        v-model:user-id-filter="filter.id"
        v-model:email-filter="filter.email"
        v-model:query-filter="filter.q"
        v-model:role-filter="filter.role"
      />
      <div class="flex justify-between gap-4">
        <ClearButton :filter="filter" />
        <ApplyButton :filter="filter" />
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

<script setup lang="ts">
import { useGetUsers, UserTable } from '@/entities/user'
import { ApplyButton, ClearButton, useFilter } from '@/features/filter'
import { Pagination } from '@/features/pagination'
import { UserFilter, useUserParams } from '@/features/user-filter'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

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

const { users, isFetching } = useGetUsers(userParams.value)
</script>

<template>
  <div class="flex flex-col gap-4">
    <ConfirmDialog />
    <PageTitle title="пользователи" />
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
    <Pagination v-if="users" :meta="users?.meta" :links="users?.links" />
  </div>
</template>

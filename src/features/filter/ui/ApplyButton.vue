<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
import type { IFilter } from '../model/filter.types'

const props = defineProps<{
  filter: IFilter
}>()

const router = useRouter()
const applyFilter = () => {
  const sortedFilter = Object.fromEntries(
    Object.entries(props.filter).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    ),
  )

  const newFilters = { ...sortedFilter }
  newFilters.page = 1
  router.push({ query: newFilters })
}
</script>

<template>
  <ActionButton @click="applyFilter" class="p-4" title="Применить"></ActionButton>
</template>

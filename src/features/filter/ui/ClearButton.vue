<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
import { filterInitialData, type IFilter } from '../model/types'

const props = defineProps<{
  filter: IFilter
}>()

const router = useRouter()
const clearFilter = () => {
  router.replace({
    query: {
      page: 1,
    },
  })
  Object.assign(props.filter, filterInitialData)
}
</script>

<template>
  <ActionButton @click="clearFilter" class="p-4" title="Очистить"></ActionButton>
</template>

<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
import { filterInitialData, useFilter, type IFilter } from '../lib/useFilter'

const props = defineProps<{
  filter: IFilter
}>()

const router = useRouter()
const clearFilter = () => {
  router.replace({
    params: {},
  })
  Object.assign(props.filter, filterInitialData)
}
</script>

<template>
  <ActionButton @click="clearFilter" class="p-4" title="Очистить"></ActionButton>
</template>

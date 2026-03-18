<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'
import type { IFilter } from '../lib/useFilter'

const props = defineProps<{
  filter: IFilter
}>()

const router = useRouter()
const applyFilter = () => {
  const newFilters = { ...props.filter }
  newFilters.page = 1
  router.push({ query: newFilters })
}
</script>

<template>
  <ActionButton @click="applyFilter" class="p-4" title="Применить"></ActionButton>
</template>

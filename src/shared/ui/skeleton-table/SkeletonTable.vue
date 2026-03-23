<script setup lang="ts">
import { DataTable, Column, Skeleton } from 'primevue'

const props = withDefaults(
  defineProps<{
    rows?: number
    cols?: number
  }>(),
  {
    rows: 6,
    cols: 6,
  },
)
</script>

<template>
  <DataTable :value="Array(props.rows)">
    <Column v-for="n in props.cols" :key="n">
      <template #body>
        <Skeleton shape="text" class="w-full h-4" />
      </template>
    </Column>
  </DataTable>
</template>

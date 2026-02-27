<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Column, DataTable } from 'primevue'
import { categoryData } from '../model/category.types'

const categories = categoryData
</script>
<template>
  <DataTable :value="categories">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Название"></Column>
  </DataTable>
</template>

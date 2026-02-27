<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Column, DataTable } from 'primevue'
import { reservationData } from '../model/reservation.types'

// onMounted(() => {
//   ProductService.getProductsMini().then((data) => (products.value = data))
// })

// const products = ref()
// const formatCurrency = (value) => {
//   return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
// }
// const getSeverity = (product) => {
//   switch (product.inventoryStatus) {
//     case 'INSTOCK':
//       return 'success'

//     case 'LOWSTOCK':
//       return 'warn'

//     case 'OUTOFSTOCK':
//       return 'danger'

//     default:
//       return null
//   }
// }

const reservations = reservationData
</script>
<template>
  <div class="card">
    <DataTable :value="reservations">
      <!-- <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Products</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template> -->
      <Column field="id" header="ID"></Column>
      <Column field="reservedBy" header="Пользователь"></Column>
      <Column field="book.title" header="ID книги"></Column>
      <Column header="Обложка">
        <template #body="slotProps">
          <img
            :src="`${slotProps.data.book.image}`"
            :alt="slotProps.data.book.image"
            class="w-24 rounded"
          />
        </template>
      </Column>
      <Column field="expiresAt" header="Истекает в"></Column>
      <!-- <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="category" header="Category"></Column>
      <Column field="rating" header="Reviews">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating" readonly />
        </template>
      </Column> -->
      <!-- <Column header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template> -->
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { PUBLIC_URL } from '@/shared/config/url.config'
import type { IBook } from '../model/book.types'
import { BookCard } from '..'
import { Toast } from 'primevue'

const props = defineProps<{
  items: IBook[]
  variant: 'default' | 'catalog'
}>()

const styles: Record<'default' | 'catalog', string> = {
  default:
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center gap-4 sm:gap-6  p-2 md:p-4 items-start',
  catalog:
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-2 md:p-4 items-start',
}
</script>

<template>
  <Toast />
  <div :class="styles[variant]">
    <BookCard v-for="item in items" :book="item" :is-editable="false" />
  </div>
</template>

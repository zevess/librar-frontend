<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList } from '@/entities/book'
import { PrimeDrawer } from '@/shared/ui/drawer'
import { PageTitle } from '@/shared/ui/page-title'
import { ref } from 'vue'
import { CatalogFilter } from '@/features/catalog-filter'

// const genres = ref()
// const category = ref()
// const publishers = ref()
// const availability = ref('Все')
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center justify-between">
      <PageTitle title="каталог" />
      <div class="block lg:hidden">
        <PrimeDrawer drawer-name="Фильтрация" icon="filter">
          <CatalogFilter />
        </PrimeDrawer>
      </div>
    </div>

    <div class="flex flex-row justify-center lg:justify-between">
      <div class="hidden lg:block w-full max-w-60">
        <CatalogFilter />
      </div>

      <BookList :is-reservable="true" variant="catalog" :items="bookData" class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList } from '@/entities/book/ui/book-list'
import { Filter } from '@/features/filter'
import { PrimeDrawer } from '@/shared/ui/drawer'
import { PageTitle } from '@/shared/ui/page-title'
import { ref } from 'vue'

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
          <Filter />
        </PrimeDrawer>
      </div>
    </div>

    <div class="flex flex-row justify-center lg:justify-between">
      <div class="hidden lg:block w-full max-w-60">
        <Filter />
      </div>

      <BookList variant="catalog" :items="bookData" class="" />
    </div>
  </div>
</template>

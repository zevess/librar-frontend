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
    <PageTitle title="каталог" />
    <div class="flex gap-8">
      <div class="w-1/5">
        <Filter />
      </div>
      <PrimeDrawer drawer-name="Фильтрация" icon="filter">
        <Filter />
      </PrimeDrawer>
      <!-- <div class="w-4/5">
        <BookList variant="catalog" :items="bookData" class="" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList } from '@/entities/book/ui/book-list'
import { Filter } from '@/features/filter'
import { PageTitle } from '@/shared/ui/page-title'
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="каталог" />
    <div class="flex gap-8">
      <div class="w-1/5">
        <Filter />
      </div>
      <div class="w-4/5">
        <BookList :items="bookData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookList } from '@/entities/book'
import { bookData } from '@/entities/book/model/book.types'
import AdminBookCard from '@/entities/book/ui/AdminBookCard.vue'
import { BookFilter } from '@/features/book-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="книги" />
    <BookFilter />
    <div class="flex justify-center md:justify-end">
      <RouterLink :to="PUBLIC_URL.adminBookCreate()" class="w-full md:w-fit">
        <ActionButton title="Создать книгу" class="p-4 w-full" />
      </RouterLink>
    </div>
    <BookList :is-reservable="false" :items="bookData" variant="default" />
  </div>
</template>

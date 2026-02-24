<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList } from '@/entities/book/ui/book-list'
import { publisherData } from '@/entities/publisher/model/publisher.types'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'

const publisher = publisherData[0]
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle :title="publisher?.name" class="text-center md:text-left mb-2" />
      <PageSubtitle title="издательство" />
    </div>
    <p>{{ publisher?.description }}</p>
    <BookList :items="bookData" variant="default" />
  </div>
</template>

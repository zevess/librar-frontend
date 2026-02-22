<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookCard } from '@/entities/book/ui/book-card'
import { BookList } from '@/entities/book/ui/book-list'
import { ActionButton } from '@/shared/ui/action-button'
import { PrimeCarousel } from '@/shared/ui/carousel'
import { PageTitle } from '@/shared/ui/page-title'
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="новые поступления" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti nulla dolor quod
      obcaecati voluptas mollitia cum ipsa? Sunt eveniet dolore iusto minus magnam sed sequi
      corrupti tempora omnis veritatis!
    </p>
    <BookList variant="default" :items="bookData" />

    <!-- <PrimeCarousel :values="bookData"> -->
    <!-- <template #item="slot">
        <BookCard
          :is-awailable="slot.data.isAwailable"
          :title="slot.data.title"
          :author="slot.data.author"
          :image="slot.data.image"
        />
      </template> -->
    <!-- </PrimeCarousel> -->
    <ActionButton class="w-1/4 mx-auto" title="смотреть больше" />
  </div>
</template>

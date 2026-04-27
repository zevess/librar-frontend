<script setup lang="ts">
import { Introducing } from '@/shared/ui/introducing'
import { BookCategorySection, NewArrivalsSection } from '@/widgets/book-sections'
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <Introducing />
    <NewArrivalsSection />
    <BookCategorySection title="Художественная литература" :category-id="1" />
    <BookCategorySection title="Комиксы" :category-id="2" />
    <BookCategorySection title="Манга" :category-id="3" />
    <BookCategorySection title="Детские" :category-id="7" />
  </div>
</template>

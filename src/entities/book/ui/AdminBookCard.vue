<script setup lang="ts">
import { BookCard } from '..'
import { bookData } from '../model/book.types'
</script>

<template>
  <div class="">
    <BookCard :book="bookData[0]" />
  </div>
</template>

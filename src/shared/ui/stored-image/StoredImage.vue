<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { API_URL, BASE_SERVER_URL, SERVER_URL } from '@/shared/config'

const props = defineProps<{
  url: string
}>()

const imageUrl = `${BASE_SERVER_URL}${props.url}`
console.log(imageUrl)
</script>

<template>
  <img :src="imageUrl ?? bookData[0]?.image" class="w-full h-full object-contain" alt="" />
</template>

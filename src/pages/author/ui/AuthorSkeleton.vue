<script setup lang="ts">
import { BookListSkeleton } from '@/entities/book'
import { Skeleton } from 'primevue'
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <Skeleton height="32px" width="260px" class="my-4"></Skeleton>

    <Skeleton height="20px" width="360px"></Skeleton>
    <BookListSkeleton variant="default" />
  </div>
</template>

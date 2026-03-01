<script setup lang="ts">
import { Skeleton } from 'primevue'
</script>

<template>
  <div class="flex flex-col gap-2 w-36 sm:w-48 p-2 rounded-md">
    <Skeleton height="100%" class="aspect-2/3 overflow-hidden rounded"></Skeleton>
    <div class="flex flex-col gap-2">
      <Skeleton></Skeleton>
      <Skeleton width="50%"></Skeleton>
    </div>
    <Skeleton height="32px"></Skeleton>
  </div>
</template>

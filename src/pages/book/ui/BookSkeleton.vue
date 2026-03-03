<script setup lang="ts">
import { Skeleton } from 'primevue'
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col gap-2">
      <Skeleton height="32px" width="260px" class="my-4"></Skeleton>
      <Skeleton height="24px" width="120px"></Skeleton>
    </div>

    <div class="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-16">
      <div class="flex flex-col w-full max-w-80 md:sticky md:top-2">
        <Skeleton width="100%" height="100%" class="aspect-2/3 object-contain rounded"></Skeleton>
      </div>

      <div class="flex flex-col gap-4 w-full md:max-w-2/3">
        <div class="flex flex-col gap-2">
          <Skeleton width="100%"></Skeleton>
        </div>

        <div class="border border-[#bededc]"></div>
        <ul class="w-full gap-4 grid grid-cols-1 lg:grid-cols-2 justify-between">
          <li class="flex gap-8" v-for="n in 4" :key="n">
            <Skeleton width="120px"></Skeleton>
            <Skeleton width="200px"></Skeleton>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

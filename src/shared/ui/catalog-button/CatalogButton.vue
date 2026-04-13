<script setup lang="ts">
import { PUBLIC_URL } from '@/shared/config'
import { RouterLink, useRoute, useRouter } from 'vue-router'
</script>

<template>
  <RouterLink :to="PUBLIC_URL.catalog()">
    <div
      class="flex items-center transition bg-[#d1ebe9] hover:bg-[#bededc] p-4 cursor-pointer rounded-xl gap-2"
    >
      <span :class="`pi pi-book`" style="font-size: 24px"></span>
      <span class="lowercase text-xl font-medium">каталог</span>
    </div>
  </RouterLink>
</template>

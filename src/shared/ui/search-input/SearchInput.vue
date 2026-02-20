<script setup lang="ts">
import { SearchButton } from '../search-button'
</script>

<template>
  <div class="flex items-center w-full max-w-md">
    <input
      placeholder="найти..."
      type="text"
      class="border-2 w-full rounded-r-none h-12 border-[#d1ebe9] rounded-md p-2 bg-gray-50 focus:border-[#a4c8c6] focus:outline-0 focus:border-r-2"
    />
    <SearchButton />
  </div>
</template>
<!-- bg-[#d1ebe9] hover:bg-[#bededc] -->ы

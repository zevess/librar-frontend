<script setup lang="ts">
const title = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div class="flex items-center w-fit">
    <li class="font-bold text-3xl lowercase">{{ title }}</li>
    <img src="/src/assets/librar-logo.svg" alt="librar logo" class="w-10" />
  </div>
</template>

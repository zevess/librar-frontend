<script setup lang="ts">
import { Header } from '@/widgets/header'
</script>

<template>
  <div class="mx-auto max-w-360">
    <Header />
    <div class="bg-white rounded-xl shadow-lg mt-9 p-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Header } from '@/widgets/header'
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <Header />
    <div class="bg-white rounded-xl shadow-lg mt-9 p-5">
      <slot></slot>
    </div>
  </div>
</template>

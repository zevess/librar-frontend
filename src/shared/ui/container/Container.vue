<script setup lang="ts">
import { Header } from '@/widgets/header'
import { SearchInput } from '../input'
import Footer from '@/widgets/footer/ui/Footer.vue'
</script>

<template>
  <!-- <div class="mx-auto max-w-360">
    <Header />
    <div class="flex md:hidden p-2 bg-white rounded-xl shadow-lg mt-6">
      <SearchInput />
    </div> -->

  <div class="bg-white rounded-xl shadow-lg mt-6 md:mt-9 p-5">
    <slot></slot>
  </div>
  <!-- <Footer class="flex md:hidden" />
  </div> -->
</template>

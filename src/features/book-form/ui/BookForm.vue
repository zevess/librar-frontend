<script setup lang="ts">
import { PrimeFileUpload } from '@/features/file-upload'
import { Input } from '@/shared/ui/input'
import { PrimeTextarea } from '@/shared/ui/textarea'
</script>

<template>
  <form action="" class="flex flex-col gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input placeholder="название книги" />
      <PrimeTextarea placeholder="описание книги" />
      <Input placeholder="ID категории" />
      <Input placeholder="ID автора" />
      <Input placeholder="ID издателя" />
    </div>
    <div class="flex flex-col md:flex-row items-center flex-wrap gap-4">
      <span class="font-semibold">Изображение</span>
      <PrimeFileUpload />
    </div>
  </form>
</template>

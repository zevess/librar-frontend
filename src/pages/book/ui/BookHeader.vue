<script setup lang="ts">
import type { IBook } from '@/entities/book'
import { useProfile } from '@/entities/user'
import { PUBLIC_URL } from '@/shared/config'
import { useGetParams } from '@/shared/lib'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { SettingButton } from '@/shared/ui/setting-button'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  book: IBook
}>()
const { slug } = useGetParams()
</script>

<template>
  <div class="flex items-center flex-col md:flex-row justify-center md:justify-between">
    <div class="flex flex-col items-center md:items-baseline w-full">
      <div class="flex justify-center md:justify-start items-center w-full">
        <PageTitle :title="book?.title" class="md:text-left" />
        <SettingButton class="block md:hidden" :to="PUBLIC_URL.adminBookEdit(slug)" />
      </div>

      <RouterLink
        v-if="book.author"
        :to="PUBLIC_URL.author(`${book?.author.slug}-${book?.author.id}`)"
        class="text-xl hover:underline text-center md:text-left w-fit"
        >{{ book?.author.name }}</RouterLink
      >
    </div>
    <div class="flex items-center gap-6">
      <SettingButton class="hidden md:block" :to="PUBLIC_URL.adminBookEdit(slug)" />
      <PageSubtitle title="книга" />
    </div>
  </div>
</template>

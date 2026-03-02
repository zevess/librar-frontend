<script setup lang="ts">
import type { IBook } from '@/entities/book'
import { PUBLIC_URL } from '@/shared/config'
import { useGetParams } from '@/shared/lib'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { SettingButton } from '@/shared/ui/setting-button'
import { Skeleton } from 'primevue'
import { inject } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  book: IBook
}>()
const { slug } = useGetParams()
const isFetching = inject('isFetching')
</script>

<template>
  <div class="flex flex-col items-center md:items-baseline w-full">
    <div class="flex justify-center md:justify-start items-center w-full">
      <PageTitle :title="book?.title" class="md:text-left" />
      <RouterLink class="block md:hidden" :to="PUBLIC_URL.adminBookEdit(slug)">
        <SettingButton />
      </RouterLink>
    </div>

    <RouterLink
      :to="PUBLIC_URL.author(`${book?.author.slug}-${book?.author.id}`)"
      class="text-xl hover:underline text-center md:text-left w-fit"
      >{{ book?.author.name }}</RouterLink
    >
  </div>
  <div class="flex items-center gap-6">
    <RouterLink class="hidden md:block" :to="PUBLIC_URL.adminBookEdit(slug)">
      <SettingButton />
    </RouterLink>
    <PageSubtitle title="книга" />
  </div>
</template>

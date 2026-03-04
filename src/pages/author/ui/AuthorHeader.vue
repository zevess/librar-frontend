<script setup lang="ts">
import type { IAuthor } from '@/entities/author'
import { PUBLIC_URL } from '@/shared/config'
import { useGetParams } from '@/shared/lib'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { SettingButton } from '@/shared/ui/setting-button'
import { RouterLink } from 'vue-router'
defineProps<{
  author: IAuthor
}>()
const { slug } = useGetParams()
</script>

<template>
  <div class="flex items-center flex-col md:flex-row justify-center md:justify-between">
    <div class="flex flex-col items-center md:items-baseline w-full">
      <div class="flex justify-center md:justify-start items-center w-full">
        <PageTitle :title="author.name" class="md:text-left" />
        <RouterLink class="block md:hidden" :to="PUBLIC_URL.adminAuthorEdit(slug)">
          <SettingButton />
        </RouterLink>
      </div>
    </div>
    <div class="flex items-center gap-6">
      <RouterLink class="hidden md:block" :to="PUBLIC_URL.adminAuthorEdit(slug)">
        <SettingButton />
      </RouterLink>
      <PageSubtitle title="автор" />
    </div>
  </div>
</template>

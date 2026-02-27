<script setup lang="ts">
import { authorData, type IAuthor } from '@/entities/author/model/author.types'
import { bookData } from '@/entities/book/model/book.types'
import { BookList, BookCard } from '@/entities/book'

import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { SettingButton } from '@/shared/ui/setting-button'
// defineProps<IAuthor>()
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle :title="authorData.name" class="text-center md:text-left mb-2" />
      <div class="flex items-center gap-6">
        <RouterLink :to="PUBLIC_URL.adminAuthorEdit('author')">
          <SettingButton />
        </RouterLink>

        <PageSubtitle title="автор" />
      </div>
    </div>
    <p>{{ authorData.description }}</p>
    <BookList :is-reservable="true" :items="bookData" variant="default" />
  </div>
</template>

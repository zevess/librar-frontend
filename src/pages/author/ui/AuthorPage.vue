<script setup lang="ts">
import { authorData, type IAuthor } from '@/entities/author/model/author.types'
import { bookData } from '@/entities/book/model/book.types'
import { BookList, BookCard } from '@/entities/book'

import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { SettingButton } from '@/shared/ui/setting-button'
import { useGetParams } from '@/shared/lib'
import { useGetAuthor } from '@/entities/author'
// defineProps<IAuthor>()
const { slug } = useGetParams()
const { author } = useGetAuthor(slug)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle :title="author?.data.name" class="text-center md:text-left mb-2" />
      <div class="flex items-center gap-6">
        <RouterLink :to="PUBLIC_URL.adminAuthorEdit(`${author?.data.slug}-${author?.data.id}`)">
          <SettingButton />
        </RouterLink>

        <PageSubtitle title="автор" />
      </div>
    </div>
    <p>{{ author?.data.description }}</p>
    <BookList :is-reservable="true" :items="author?.data.books.data ?? []" variant="default" />
  </div>
</template>

<script setup lang="ts">
import { bookData } from '@/entities/book/model/book.types'
import { BookList } from '@/entities/book'
import { publisherData } from '@/entities/publisher/model/publisher.types'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { SettingButton } from '@/shared/ui/setting-button'

const publisher = publisherData[0]
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <PageTitle :title="publisher?.name" class="text-center md:text-left mb-2" />
      <div class="flex items-center gap-6">
        <RouterLink :to="PUBLIC_URL.adminPublisherEdit('publisher')">
          <SettingButton />
        </RouterLink>

        <PageSubtitle title="издательство" />
      </div>
    </div>
    <p>{{ publisher?.description }}</p>
    <BookList :is-reservable="true" :items="bookData" variant="default" />
  </div>
</template>

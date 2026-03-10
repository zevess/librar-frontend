<script setup lang="ts">
import { PublisherFilter } from '@/features/publisher-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="издательства" />
    <div class="flex flex-col md:flex-row gap-4 justify-between">
      <PublisherFilter />
      <div class="flex justify-center md:justify-end">
        <LinkButton :to="PUBLIC_URL.adminPublisherCreate()" text="Добавить издательство" />
      </div>
    </div>

    <!-- <BookList :is-reservable="false" :items="bookData" variant="default" /> -->
  </div>
</template>

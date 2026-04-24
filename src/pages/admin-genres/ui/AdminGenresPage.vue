<script setup lang="ts">
import { GenresTable, useGetAdminGenres } from '@/entities/genre'
import { useFilter } from '@/features/filter'
import { GenreFilter } from '@/features/genre-filter'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { LinkButton } from '@/shared/ui/link-button'
import { PageTitle } from '@/shared/ui/page-title'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { ConfirmDialog } from 'primevue'
import { Message } from '@/shared/ui/message'

const { q, id, params, applyFilter, clearFilter } = useFilter()
const { genres, isFetching } = useGetAdminGenres(params)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle title="жанры" />
    <ConfirmDialog />
    <GenreFilter v-model:genre-id-filter="id" v-model:query-filter="q" />
    <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
      <div class="flex justify-between gap-4">
        <ActionButton class="p-4" @click="clearFilter">Сбросить</ActionButton>
        <ActionButton class="p-4" @click="applyFilter">Применить</ActionButton>
      </div>
      <LinkButton :to="PUBLIC_URL.adminGenreCreate()" text="Добавить жанр" />
    </div>
    <SkeletonTable :cols="2" v-if="isFetching && !genres" />
    <GenresTable v-if="genres?.data" :genres="genres.data" />
    <Message v-if="genres?.data.length === 0"
      >Ничего не найдено. Попробуйте позже или измените запрос</Message
    >
  </div>
</template>

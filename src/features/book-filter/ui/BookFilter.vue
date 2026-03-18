<script setup lang="ts">
import { useGetCategories } from '@/entities/category'
import { useGetGenres, type IGenre } from '@/entities/genre'
import { useGetAllPublishers, useGetPublishers } from '@/entities/publisher'
import { Input } from '@/shared/ui/input'
import { PrimeMultiSelect } from '@/shared/ui/multi-select'
import { PrimeSelect } from '@/shared/ui/select'

const { publishers } = useGetAllPublishers()
const { genres } = useGetGenres()
const { categories } = useGetCategories()

const bookIdFilter = defineModel<string | null>('bookIdFilter')
const categoryFilter = defineModel<number | null>('categoryFilter')
const queryFilter = defineModel<string | null>('queryFilter')
const genresFilter = defineModel<number[] | null>('genresFilter')
const publishersFilter = defineModel<number[] | null>('publishersFilter')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">id книги:</label>
        <Input v-model="bookIdFilter" placeholder="найти..." class="w-full" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">название книги или имя автора:</label>
        <Input v-model="queryFilter" placeholder="найти..." class="w-full" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">категория:</label>
        <PrimeSelect
          v-model="categoryFilter"
          :options="categories?.data"
          option-label="name"
          option-value="id"
          placeholder="категории"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">издательства:</label>
        <PrimeMultiSelect
          v-model="publishersFilter"
          :options="publishers?.data"
          optionLabel="name"
          option-value="id"
          placeholder="издательства"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">жанры:</label>
        <PrimeMultiSelect
          v-model="genresFilter"
          :options="genres?.data"
          optionLabel="name"
          option-value="id"
          placeholder="жанры"
        />
      </div>
    </div>
  </div>
</template>

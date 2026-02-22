<script setup lang="ts">
import { bookData, type IBook } from '@/entities/book/model/book.types'
import { ActionButton } from '@/shared/ui/action-button'
import { PageTitle } from '@/shared/ui/page-title'

const book = bookData[0]
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <PageTitle :title="book?.title" class="text-center md:text-left" />

    <div class="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-16">
      <div class="flex flex-col w-full max-w-80">
        <div class="overflow-hidden rounded">
          <img :src="book?.image" class="w-full h-full object-contain" alt="" />
        </div>
        <div class="flex flex-col mt-4 gap-1">
          <span class="text-gray-500">Доступно</span>
          <ActionButton
            class="w-full h-12"
            :disabled="!book?.isAvailable"
            title="Забронировать"
          ></ActionButton>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-full md:max-w-2/3">
        <p>
          {{ book?.description }}
        </p>
        <div class="border border-[#bededc]"></div>
        <ul class="w-full gap-4 grid grid-cols-1 lg:grid-cols-2 justify-between">
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Издательство:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Издательство:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Издательство:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Издательство:</span>
            <span>{{ book?.author }}</span>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

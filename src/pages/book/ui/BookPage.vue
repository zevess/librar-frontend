<script setup lang="ts">
import { bookData, type IBook } from '@/entities/book/model/book.types'
import { ReviewCard } from '@/entities/review/ui/review-card'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { ActionButton } from '@/shared/ui/action-button'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { PrimeRating } from '@/shared/ui/rating'
import { SettingButton } from '@/shared/ui/setting-button'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const book = bookData[0]
const rating = ref(4.8)
console.log(rating.value)
watch(
  rating,
  () => {
    console.log(rating.value)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center flex-col md:flex-row justify-center md:justify-between">
      <div class="flex flex-col gap-3 md:gap-0">
        <PageTitle :title="book?.title" class="text-center md:text-left mb-2" />
        <RouterLink
          :to="PUBLIC_URL.author('/scott-snyder')"
          class="text-xl hover:underline text-center md:text-left w-fit"
          >{{ book?.author }}</RouterLink
        >
      </div>
      <div class="flex items-center gap-6">
        <RouterLink :to="PUBLIC_URL.adminBookEdit(book?.slug)">
          <SettingButton />
        </RouterLink>

        <PageSubtitle title="книга" />
      </div>
    </div>

    <div class="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-16">
      <div class="flex flex-col w-full max-w-80 md:sticky md:top-2">
        <img :src="book?.image" class="w-full h-full object-contain rounded" alt="" />

        <div class="flex flex-col mt-4 gap-1">
          <span class="text-gray-500">Доступно</span>
          <ActionButton
            class="w-full h-12"
            :disabled="!book?.isAvailable"
            title="Забронировать"
          ></ActionButton>
        </div>
        <div class="mt-6 flex items-center gap-4">
          <span class="text-4xl">{{ rating }}</span>
          <PrimeRating v-model="rating" readonly font-size="x-large" />
          <span>5 оценок</span>
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
            <RouterLink :to="PUBLIC_URL.publisher('publisher')">{{ book?.publisher }}</RouterLink>
          </li>
          <li class="flex gap-8">
            <span class="text-gray-700 w-30">Автор:</span>
            <span>{{ book?.author }}</span>
          </li>
        </ul>
        <div class="mt-24 flex flex-col gap-4">
          <h2 class="text-xl font-semibold">ОТЗЫВЫ</h2>
          <ReviewCard
            v-for="n in 5"
            :key="n"
            name="Пользователь"
            :rating="n % 2 == 0 ? 2 : 5"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat."
          />
        </div>
      </div>
    </div>
  </div>
</template>

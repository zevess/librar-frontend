<script setup lang="ts">
import { useGetBooks } from '@/entities/book'
import { useGetCategories } from '@/entities/category'
import { categoryData } from '@/entities/category/model/category.types'
import { useGetGenres } from '@/entities/genre'
import { genreData } from '@/entities/genre/model/genre.types'
import { useGetPublishers } from '@/entities/publisher'
import { publisherData } from '@/entities/publisher/model/publisher.types'
import { convertArrayQuery, getArrayKey } from '@/shared/lib'
import { PrimeAccordion } from '@/shared/ui/accordion'
import { ActionButton } from '@/shared/ui/action-button'
import { PrimeCheckbox } from '@/shared/ui/checkbox'
import { PrimeRadioButton } from '@/shared/ui/radio-button'
import { Accordion } from 'primevue'

const { categories } = useGetCategories()
const { genres } = useGetGenres()
const { publishers } = useGetPublishers()

const categoryFilter = defineModel<number | null>('categoryFilter')
const genreFilter = defineModel<number[]>('genreFilter')
const publisherFilter = defineModel<number[]>('publisherFilter')
const emit = defineEmits(['apply'])
</script>

<template>
  <Accordion :multiple="true">
    <PrimeAccordion header="категории" :value="0">
      <div class="flex flex-col gap-2">
        <PrimeRadioButton
          v-for="item in categories?.data"
          v-model="categoryFilter"
          :name="item.name"
          :value="item.id"
          :input-id="item.slug"
          :label="item.name"
        ></PrimeRadioButton>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="жанры" :value="1">
      <div class="flex flex-col gap-2">
        <PrimeCheckbox
          v-for="item in genres?.data"
          v-model="genreFilter"
          :name="item.slug"
          :label="item.name"
          :value="item.id"
          :input-id="item.slug"
        ></PrimeCheckbox>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="издательства" :value="2">
      <div class="flex flex-col gap-2">
        <PrimeCheckbox
          v-for="item in publishers"
          v-model="publisherFilter"
          :name="item?.slug"
          :value="item.id"
          :input-id="item?.slug"
          :label="item.name"
        ></PrimeCheckbox>
      </div>
    </PrimeAccordion>
    <!-- <PrimeAccordion header="наличие" :value="3">
      <div class="flex flex-col gap-2">
        <PrimeRadioButton
          v-model="selectedAvailability"
          name="all"
          value="Все"
          input-id="all"
        ></PrimeRadioButton>
        <PrimeRadioButton
          v-model="selectedAvailability"
          name="true"
          value="Доступные"
          input-id="true"
        ></PrimeRadioButton>
        <PrimeRadioButton
          v-model="selectedAvailability"
          name="false"
          value="Забронированные"
          input-id="false"
        ></PrimeRadioButton>
      </div>
    </PrimeAccordion> -->
  </Accordion>
  <!-- <ActionButton @click="emit('apply')" title="Применить" /> -->
</template>

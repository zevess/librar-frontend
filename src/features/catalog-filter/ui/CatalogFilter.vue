<script setup lang="ts">
import { useGetCategories } from '@/entities/category'
import { categoryData } from '@/entities/category/model/category.types'
import { useGetGenres } from '@/entities/genre'
import { genreData } from '@/entities/genre/model/genre.types'
import { publisherData } from '@/entities/publisher/model/publisher.types'
import { PrimeAccordion } from '@/shared/ui/accordion'
import { PrimeCheckbox } from '@/shared/ui/checkbox'
import { PrimeRadioButton } from '@/shared/ui/radio-button'
import { Accordion } from 'primevue'
import { ref, watch } from 'vue'

const selectedGenres = ref()
const selectedCategory = ref()
const selectedPublishers = ref()
const selectedAvailability = ref('Все')

const { categories } = useGetCategories()
const { genres } = useGetGenres()
</script>

<template>
  <Accordion :multiple="true">
    <PrimeAccordion header="категории" :value="0">
      <div class="flex flex-col gap-2">
        <PrimeRadioButton
          v-for="item in categories?.data"
          v-model="selectedCategory"
          :name="item.name"
          :value="item.name"
          :input-id="item.slug"
        ></PrimeRadioButton>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="жанры" :value="1">
      <div class="flex flex-col gap-2">
        <PrimeCheckbox
          v-for="item in genres?.data"
          v-model="selectedGenres"
          :name="item.slug"
          :value="item.name"
          :input-id="item.slug"
        ></PrimeCheckbox>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="издательства" :value="2">
      <div class="flex flex-col gap-2">
        <PrimeCheckbox
          v-for="item in publisherData"
          v-model="selectedPublishers"
          :name="item?.slug"
          :value="item.name"
          :input-id="item?.slug"
        ></PrimeCheckbox>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="наличие" :value="3">
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
    </PrimeAccordion>
  </Accordion>
</template>

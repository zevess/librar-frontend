<script setup lang="ts">
import { categoryData } from '@/entities/category/model/category.types'
import { genreData } from '@/entities/genre/model/genre.types'
import { publisherData } from '@/entities/publisher/model/publisher.types'
import { PrimeAccordion } from '@/shared/ui/accordion'
import { PrimeCheckbox } from '@/shared/ui/checkbox'
import { PrimeRadioButton } from '@/shared/ui/radio-button'
import { Accordion } from 'primevue'
import { ref, watch } from 'vue'

// defineProps<{
//   category: any
//   genres: any
//   publishers: any
//   availability: any
// }>()
const genres = ref()
const category = ref()
const publishers = ref()
const availability = ref('Все')
</script>

<template>
  <Accordion :multiple="true">
    <PrimeAccordion header="категории" :value="0">
      <div class="flex flex-col gap-2">
        <PrimeRadioButton
          v-for="item in categoryData"
          v-model="category"
          :name="item.slug"
          :value="item.name"
          :input-id="item.slug"
        ></PrimeRadioButton>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="жанры" :value="1">
      <div class="flex flex-col gap-2">
        <PrimeCheckbox
          v-for="item in genreData"
          v-model="genres"
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
          v-model="publishers"
          :name="item?.slug"
          :value="item.name"
          :input-id="item?.slug"
        ></PrimeCheckbox>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="наличие" :value="3">
      <div class="flex flex-col gap-2">
        <PrimeRadioButton
          v-model="availability"
          name="all"
          value="Все"
          input-id="all"
        ></PrimeRadioButton>
        <PrimeRadioButton
          v-model="availability"
          name="true"
          value="Доступные"
          input-id="true"
        ></PrimeRadioButton>
        <PrimeRadioButton
          v-model="availability"
          name="false"
          value="Забронированные"
          input-id="false"
        ></PrimeRadioButton>
      </div>
    </PrimeAccordion>
  </Accordion>
</template>

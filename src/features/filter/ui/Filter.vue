<script setup lang="ts">
import { categoryData } from '@/entities/category/model/category.types'
import { genreData } from '@/entities/genre/model/genre.types'
import { PrimeAccordion } from '@/shared/ui/accordion'
import { PrimeCheckbox } from '@/shared/ui/checkbox'
import { PrimeRadioButton } from '@/shared/ui/radio-button'
import { Accordion } from 'primevue'
import { ref, watch } from 'vue'

const genres = ref()
const category = ref()
watch(
  genres,
  () => {
    console.log(genres.value)
  },
  {
    deep: true,
  },
)

watch(category, () => {
  console.log(category.value)
})
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
  </Accordion>
</template>

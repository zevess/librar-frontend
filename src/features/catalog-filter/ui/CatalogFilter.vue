<script setup lang="ts">
import { BookStatus } from '@/entities/book'
import { useGetCategories } from '@/entities/category'
import { useGetGenres } from '@/entities/genre'
import { useGetAllPublishers } from '@/entities/publisher'
import { PrimeAccordion } from '@/shared/ui/accordion'
import { PrimeCheckbox } from '@/shared/ui/checkbox'
import { PrimeRadioButton } from '@/shared/ui/radio-button'
import { Accordion } from 'primevue'

const { categories } = useGetCategories()
const { genres } = useGetGenres()
const { publishers } = useGetAllPublishers()

const categoryFilter = defineModel<number | null>('categoryFilter')
const genreFilter = defineModel<number[]>('genreFilter')
const publisherFilter = defineModel<number[]>('publisherFilter')
const statusFilter = defineModel<string | null>('statusFilter')
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
          v-for="item in publishers?.data"
          v-model="publisherFilter"
          :name="item?.slug"
          :value="item.id"
          :input-id="item?.slug"
          :label="item.name"
        ></PrimeCheckbox>
      </div>
    </PrimeAccordion>
    <PrimeAccordion header="наличие" :value="3">
      <div class="flex flex-col gap-2">
        <PrimeRadioButton v-model="statusFilter" name="" value="" label="Все"></PrimeRadioButton>
        <PrimeRadioButton
          v-model="statusFilter"
          :name="BookStatus.AVAILABLE"
          :value="BookStatus.AVAILABLE"
          label="Доступные"
        ></PrimeRadioButton>
        <PrimeRadioButton
          v-model="statusFilter"
          :name="BookStatus.RESERVED"
          :value="BookStatus.RESERVED"
          label="Забронированные"
        ></PrimeRadioButton>
      </div>
    </PrimeAccordion>
  </Accordion>
</template>

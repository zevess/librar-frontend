<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { genreSchema, useCreateGenre, type GenreSchema, type IGenre } from '@/entities/genre'

const props = defineProps<{
  mode: 'create' | 'attach' | 'detach'
  genre?: IGenre
}>()

const { createGenre, isGenreCreating } = useCreateGenre()
const { handleSubmit, errors, defineField, meta, resetForm, values } = useForm<GenreSchema>({
  validationSchema: toTypedSchema(genreSchema),
  initialValues: {
    name: props.genre ? props.genre.name : '',
  },
})
const [name, nameAttrs] = defineField('name')
const [book, bookAttrs] = defineField('book')
const [genres, genresAttrs] = defineField('genres')

const onSubmit = handleSubmit(async (formValues) => {
  if (props.mode === 'create') createGenre(formValues)
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-if="mode === 'create'">
        <Input v-model="name" v-bind="nameAttrs" placeholder="название жанра" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>
      <!-- <div v-if="mode === 'attach' || mode === 'detach'">
        <Input type="number" v-model="book" v-bind="bookAttrs" placeholder="ID книги" />
        <span v-if="errors.book" class="text-red-500">{{ errors.book }}</span>
      </div>
      <div v-if="mode === 'attach' || mode === 'detach'">
        <Input
          type="number"
          v-model="genre"
          v-bind="genresAttrs"
          placeholder="ID жанров (через пробел)"
        />
        <span v-if="errors.genres" class="text-red-500">{{ errors.genres }}</span>
      </div> -->
    </div>

    <div class="w-full flex justify-center">
      <ActionButton
        :disabled="!meta.valid || isGenreCreating"
        type="submit"
        class="md:max-w-1/3 w-full"
        :title="mode === 'create' ? 'Добавить жанр' : 'Изменить жанр'"
      />
    </div>
  </form>
</template>

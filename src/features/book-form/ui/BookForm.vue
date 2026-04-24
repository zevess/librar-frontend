<script setup lang="ts">
import {
  bookSchema,
  useCreateBook,
  useDeleteBook,
  useUpdateBook,
  type BookSchema,
  type IBook,
} from '@/entities/book'
import { PrimeFileUpload, useFileUpload } from '@/features/file-upload'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useBookFormInitialValues } from '../lib/useBookFormInitialValues'
import { type IGenre } from '@/entities/genre'
import { GenresAutocomplete } from '@/features/genres-autocomplete'
import { PrimeRadioButton } from '@/shared/ui/radio-button'
import { DeleteButton } from '@/features/delete-button'
import { Textarea } from '@/shared/ui/textarea'
import { CategoryAutocomplete } from '@/features/category-autocomplete'
import type { ICategory } from '@/entities/category'
import { AuthorAutocomplete } from '@/features/author-autocomplete'
import type { IAuthor } from '@/entities/author'
import { PublisherAutocomplete } from '@/features/publisher-autocomplete'
import type { IPublisher } from '@/entities/publisher'
import { useGenresAction } from '../lib/useGenresAction'
import { PrimeCheckbox } from '@/shared/ui/checkbox'

const props = defineProps<{
  mode: 'create' | 'edit'
  book?: IBook
}>()

const { upload, isFileUploading } = useFileUpload()
const { createBook, isPending, errorMessage } = useCreateBook()
const { updateBook, isUpdating } = useUpdateBook(String(props.book?.id))
const { deleteBook } = useDeleteBook()
const { genresAction } = useGenresAction(String(props.book?.id))

const initialValues = useBookFormInitialValues(props.book)
const { handleSubmit, errors, defineField, meta } = useForm<BookSchema>({
  validationSchema: toTypedSchema(bookSchema),
  initialValues: initialValues,
})
const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [category, categoryAttrs] = defineField('category_id')
const [author, authorAttrs] = defineField('author_id')
const [publisher, publisherAttrs] = defineField('publisher_id')

const imageUrl = ref<string | null>(props.book?.image ?? null)
const image = ref<File | null>(null)

const selectedCategory = ref<ICategory | null>(props.book?.category ?? null)
const selectedAuthor = ref<IAuthor | null>(props.book?.author ?? null)
const selectedPublisher = ref<IPublisher | null>(props.book?.publisher ?? null)
const selectedGenres = ref<IGenre[]>(props.book?.genres.data ?? [])
const genres = computed(() => selectedGenres.value.map((g) => g.id))
const genresMode = ref<'attach' | 'detach'>('attach')
const isAuthorDisabled = ref()

const onSubmit = handleSubmit(async (formValues) => {
  if (props.mode === 'create') {
    if (!image.value) createBook(formValues)
    if (image.value) {
      const formData = new FormData()
      formData.append('file', image.value)
      upload(formData, {
        onSuccess: (uploadedImage) => {
          createBook({
            ...formValues,
            image: uploadedImage.data.url,
          })
        },
      })
    }
  }
  if (props.mode === 'edit') {
    if (!image.value) {
      updateBook(
        {
          ...formValues,
          image: imageUrl.value,
        },
        {
          onSuccess: () => {
            genresAction(genresMode.value, genres.value)
          },
        },
      )
    }
    if (image.value) {
      const formData = new FormData()
      formData.append('file', image.value)
      upload(formData, {
        onSuccess: (uploadedImage) => {
          updateBook(
            {
              ...formValues,
              image: uploadedImage.data.url,
            },
            {
              onSuccess: () => {
                genresAction(genresMode.value, genres.value)
              },
            },
          )
        },
      })
    }
  }
})

watch(isAuthorDisabled, () => {
  if (isAuthorDisabled.value) {
    selectedAuthor.value = null
    author.value = null
  }
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="text-gray-500" :for="title">название книги</label>
        <Input
          type="text"
          with-label
          label="название книги"
          v-model="title"
          v-bind="titleAttrs"
          placeholder="название книги"
        />
        <span v-if="errors.title" class="text-red-500">{{ errors.title }}</span>
      </div>
      <div>
        <label class="text-gray-500" :for="description">описание книги</label>
        <Textarea
          with-label
          label="описание книги"
          v-model="description"
          v-bind="descriptionAttrs"
          placeholder="описание книги"
        />
        <span v-if="errors.description" class="text-red-500">{{ errors.description }}</span>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-gray-500" for="authorAutocomplete">автор</label>
          <AuthorAutocomplete
            id="authorAutocomplete"
            v-model:selected-author="selectedAuthor"
            v-model:author="author"
            :disabled="isAuthorDisabled"
          />
        </div>
        <PrimeCheckbox
          v-model="isAuthorDisabled"
          name="isAuthorDisabled"
          input-id="isAuthorDisabled"
          label="Без автора"
          binary
        />
        <span v-if="errors.author_id" class="text-red-500">{{ errors.author_id }}</span>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-gray-500" for="publisherAutocomplete">издательство</label>
          <PublisherAutocomplete
            id="publisherAutocomplete"
            v-model:selected-publisher="selectedPublisher"
            v-model:publisher="publisher"
          />
        </div>

        <span v-if="errors.publisher_id" class="text-red-500">{{ errors.publisher_id }}</span>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-gray-500" for="categoryAutocomplete">категория</label>
          <CategoryAutocomplete
            id="categoryAutocomplete"
            v-model:selected-category="selectedCategory"
            v-model:category="category"
          />
        </div>
        <span v-if="errors.category_id" class="text-red-500">{{ errors.category_id }}</span>
      </div>
      <div class="flex flex-col gap-4" v-if="mode === 'edit'">
        <div class="flex flex-col">
          <label class="text-gray-500" for="genresAutocomplete">жанры</label>
          <GenresAutocomplete id="genresAutocomplete" v-model:selected-genres="selectedGenres" />
        </div>
        <div class="flex gap-4">
          <PrimeRadioButton value="attach" v-model="genresMode" label="Добавить"></PrimeRadioButton>
          <PrimeRadioButton value="detach" v-model="genresMode" label="Убрать"></PrimeRadioButton>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row items-center flex-wrap gap-4">
      <span class="font-semibold">Изображение</span>
      <PrimeFileUpload v-model:image="image" v-model:src="imageUrl" />
    </div>
    <div class="w-full flex flex-col items-center">
      <ActionButton
        :disabled="!meta.valid || isPending || isUpdating || isFileUploading"
        type="submit"
        class="md:max-w-1/3 p-4"
        :title="props.mode === 'create' ? 'Создать книгу' : 'Изменить книгу'"
      />
    </div>
  </form>
  <div class="w-full flex md:justify-start justify-center mt-4">
    <DeleteButton
      v-if="mode === 'edit'"
      title="Удалить книгу"
      confirm-header="Удалить книгу"
      v-on:delete="deleteBook(String(props.book?.id))"
    />
  </div>
</template>

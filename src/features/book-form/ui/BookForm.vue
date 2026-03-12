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
import { useAttachGenres, useDetachGenres, useGetGenres, type IGenre } from '@/entities/genre'
import { GenresAutocomplete } from '@/features/genres-autocomplete'
import { PrimeRadioButton } from '@/shared/ui/radio-button'
import { useConfirm, useToast } from 'primevue'
import { DeleteButton } from '@/shared/ui/delete-button'
import { Textarea } from '@/shared/ui/textarea'

const props = defineProps<{
  mode: 'create' | 'edit'
  book?: IBook
}>()

const confirm = useConfirm()
const toast = useToast()
const { upload, isFileUploading } = useFileUpload()
const { createBook, isPending, errorMessage } = useCreateBook()
const { updateBook, isUpdating } = useUpdateBook(String(props.book?.id))
const { deleteBook } = useDeleteBook()
const { attachGenre } = useAttachGenres(String(props.book?.id))
const { detachGenre } = useDetachGenres(String(props.book?.id))

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

const selectedGenres = ref<IGenre[]>(props.book?.genres.data ?? [])
const genres = computed(() => selectedGenres.value.map((g) => g.id))
const genresAction = ref<'attach' | 'detach'>('attach')

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
            if (genresAction.value === 'attach') {
              attachGenre({
                genres: genres.value,
              })
            }
            if (genresAction.value === 'detach') {
              detachGenre({
                genres: genres.value,
              })
            }
            toast.add({
              severity: 'success',
              summary: 'Статус',
              detail: 'Книга успешно обновлена',
              life: 3000,
            })
          },
        },
      )
    }

    if (image.value) {
      const formData = new FormData()
      formData.append('file', image.value)
      upload(formData, {
        onSuccess: (uploadedImage) => {
          updateBook({
            ...formValues,
            image: uploadedImage.data.url,
          })
          toast.add({
            severity: 'success',
            summary: 'Статус',
            detail: 'Книга успешно обновлена',
            life: 3000,
          })
        },
      })
    }
  }
})

const deleteConfirm = () => {
  confirm.require({
    message: 'Вы уверены? Это действие необратимо.',
    header: 'Удалить книгу',
    icon: 'pi pi-trash',
    rejectLabel: 'Отмена',
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Удалить',
      severity: 'danger',
    },
    accept: () => {
      deleteBook(String(props.book?.id))
    },
  })
}
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
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
        <Textarea
          with-label
          label="описание книги"
          v-model="description"
          v-bind="descriptionAttrs"
          placeholder="описание книги"
        />
        <span v-if="errors.description" class="text-red-500">{{ errors.description }}</span>
      </div>
      <div>
        <Input
          with-label
          label="ID категории"
          type="number"
          v-model="category"
          v-bind="categoryAttrs"
          placeholder="ID категории"
        />
        <span v-if="errors.category_id" class="text-red-500">{{ errors.category_id }}</span>
      </div>
      <div>
        <Input
          with-label
          label="ID автора"
          type="number"
          v-model="author"
          v-bind="authorAttrs"
          placeholder="ID автора"
        />
        <span v-if="errors.author_id" class="text-red-500">{{ errors.author_id }}</span>
      </div>
      <div>
        <Input
          with-label
          label="ID издателя"
          type="number"
          v-model="publisher"
          v-bind="publisherAttrs"
          placeholder="ID издателя"
        />
        <span v-if="errors.publisher_id" class="text-red-500">{{ errors.publisher_id }}</span>
      </div>
      <div class="flex flex-col gap-4" v-if="mode === 'edit'">
        <GenresAutocomplete v-model:selected-genres="selectedGenres" />
        <div class="flex gap-4">
          <PrimeRadioButton
            value="attach"
            v-model="genresAction"
            label="Добавить"
          ></PrimeRadioButton>
          <PrimeRadioButton value="detach" v-model="genresAction" label="Убрать"></PrimeRadioButton>
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
        class="md:max-w-1/3 w-full"
        :title="props.mode === 'create' ? 'Создать книгу' : 'Изменить книгу'"
      />
    </div>
  </form>
  <div class="w-full flex md:justify-start justify-center mt-4">
    <DeleteButton v-if="mode === 'edit'" title="Удалить книгу" v-on:delete="deleteConfirm()" />
  </div>
</template>

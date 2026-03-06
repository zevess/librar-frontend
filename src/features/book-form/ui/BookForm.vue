<script setup lang="ts">
import { bookSchema, useCreateBook, type BookSchema } from '@/entities/book'
import { PrimeFileUpload, useFileUpload } from '@/features/file-upload'
import { api, apiPrivate } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { PrimeTextarea } from '@/shared/ui/textarea'
import { toTypedSchema } from '@vee-validate/zod'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

const { upload, uploadedFile, isFileUploading, error } = useFileUpload()
const { createBook, isPending, isSuccess, errorMessage } = useCreateBook()
const { handleSubmit, errors, defineField, meta, resetForm, values } = useForm<BookSchema>({
  validationSchema: toTypedSchema(bookSchema),
})
const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [category, categoryAttrs] = defineField('category_id')
const [author, authorAttrs] = defineField('author_id')
const [publisher, publisherAttrs] = defineField('publisher_id')
const image = ref<File | null>(null)

const onSubmit = handleSubmit(async (formValues) => {
  if (!image.value) return

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
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Input v-model="title" v-bind="titleAttrs" placeholder="название книги" />
        <span v-if="errors.title" class="text-red-500">{{ errors.title }}</span>
      </div>
      <div>
        <PrimeTextarea
          v-model="description"
          v-bind="descriptionAttrs"
          placeholder="описание книги"
        />
        <span v-if="errors.description" class="text-red-500">{{ errors.description }}</span>
      </div>
      <div>
        <Input type="number" v-model="category" v-bind="categoryAttrs" placeholder="ID категории" />
        <span v-if="errors.category_id" class="text-red-500">{{ errors.category_id }}</span>
      </div>
      <div>
        <Input type="number" v-model="author" v-bind="authorAttrs" placeholder="ID автора" />
        <span v-if="errors.author_id" class="text-red-500">{{ errors.author_id }}</span>
      </div>
      <div>
        <Input
          type="number"
          v-model="publisher"
          v-bind="publisherAttrs"
          placeholder="ID издателя"
        />
        <span v-if="errors.publisher_id" class="text-red-500">{{ errors.publisher_id }}</span>
      </div>
    </div>
    <div class="flex flex-col md:flex-row items-center flex-wrap gap-4">
      <span class="font-semibold">Изображение</span>
      <PrimeFileUpload v-model:image="image" />
    </div>
    <div class="w-full flex justify-center">
      <ActionButton
        :disabled="!meta.valid || isPending"
        type="submit"
        class="md:max-w-1/3 w-full"
        title="Создать книгу"
      />
    </div>
  </form>
</template>

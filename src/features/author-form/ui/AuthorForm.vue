<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import {
  authorSchema,
  useCreateAuthor,
  useDeleteAuthor,
  useUpdateAuthor,
  type AuthorSchema,
  type IAuthor,
} from '@/entities/author'
import { useAuthorFormInitialValues } from '../lib/useAuthorFormInitialValues'
import { useConfirm, useToast } from 'primevue'
import { DeleteButton } from '@/shared/ui/delete-button'
import { Textarea } from '@/shared/ui/textarea'

const props = defineProps<{
  mode: 'create' | 'edit'
  author?: IAuthor
}>()

const confirm = useConfirm()
const toast = useToast()
const initialValues = useAuthorFormInitialValues(props.author)
const { createAuthor, isAuthorCreating, errorMessage } = useCreateAuthor()
const { updateAuthor, isAuthorUpdating } = useUpdateAuthor(String(props.author?.id))
const { deleteAuthor } = useDeleteAuthor()
const { handleSubmit, errors, defineField, meta, resetForm, values } = useForm<AuthorSchema>({
  validationSchema: toTypedSchema(authorSchema),
  initialValues: initialValues,
})
const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')

const onSubmit = handleSubmit(async (formValues) => {
  if (props.mode === 'create') createAuthor(formValues)
  else {
    updateAuthor(formValues)
  }
})

const deleteConfirm = () => {
  confirm.require({
    message: 'Вы уверены? Это действие необратимо.',
    header: 'Удалить автора',
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
      deleteAuthor(String(props.author?.id))
    },
  })
}
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Input v-model="name" v-bind="nameAttrs" placeholder="имя автора" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>
      <div>
        <Textarea v-model="description" v-bind="descriptionAttrs" placeholder="описание автора" />
        <span v-if="errors.description" class="text-red-500">{{ errors.description }}</span>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <ActionButton
        :disabled="!meta.valid || isAuthorCreating || isAuthorUpdating"
        type="submit"
        class="md:max-w-1/3 w-full"
        :title="props.mode === 'create' ? 'Добавить автора' : 'Изменить автора'"
      />
    </div>
    <DeleteButton v-if="mode === 'edit'" title="Удалить автора" v-on:delete="deleteConfirm()" />
  </form>
</template>

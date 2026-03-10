<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { PrimeTextarea } from '@/shared/ui/textarea'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  categorySchema,
  useCreateCategory,
  useUpdateCategory,
  type CategorySchema,
  type ICategory,
} from '@/entities/category'
import { useCategoryFormInitialValues } from '../lib/useCategoryFormInitialValues'

const props = defineProps<{
  mode: 'create' | 'edit'
  category?: ICategory
}>()

const initialValues = useCategoryFormInitialValues(props.category)
const { createCategory, isCategoryCreating } = useCreateCategory()

const { handleSubmit, errors, defineField, meta, resetForm, values } = useForm<CategorySchema>({
  validationSchema: toTypedSchema(categorySchema),
  initialValues: initialValues,
})
const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')

const onSubmit = handleSubmit(async (formValues) => {
  if (props.mode === 'create') createCategory(formValues)
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Input v-model="name" v-bind="nameAttrs" placeholder="название категории" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>
      <div>
        <PrimeTextarea
          v-model="description"
          v-bind="descriptionAttrs"
          placeholder="описание категории"
        />
        <span v-if="errors.description" class="text-red-500">{{ errors.description }}</span>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <ActionButton
        :disabled="!meta.valid || isCategoryCreating"
        type="submit"
        class="md:max-w-1/3 w-full"
        :title="props.mode === 'create' ? 'Добавить категорию' : 'Изменить категорию'"
      />
    </div>
  </form>
</template>

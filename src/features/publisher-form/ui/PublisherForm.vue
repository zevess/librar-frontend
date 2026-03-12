<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  publisherSchema,
  useCreatePublisher,
  useUpdatePublisher,
  type IPublisher,
  type PublisherSchema,
} from '@/entities/publisher'
import { usePublisherFormInitialValues } from '../lib/usePublisherFormInitialValues'
import { Textarea } from '@/shared/ui/textarea'

const props = defineProps<{
  mode: 'create' | 'edit'
  publisher?: IPublisher
}>()

const initialValues = usePublisherFormInitialValues(props.publisher)

const { createPublisher, isPublisherCreating } = useCreatePublisher()
const { updatePublisher, isPublisherUpdating } = useUpdatePublisher(String(props.publisher?.id))
const { handleSubmit, errors, defineField, meta, resetForm, values } = useForm<PublisherSchema>({
  validationSchema: toTypedSchema(publisherSchema),
  initialValues: initialValues,
})
const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')

const onSubmit = handleSubmit(async (formValues) => {
  if (props.mode === 'create') createPublisher(formValues)
  else updatePublisher(formValues)
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Input v-model="name" v-bind="nameAttrs" placeholder="название издательства" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>
      <div>
        <Textarea
          v-model="description"
          v-bind="descriptionAttrs"
          placeholder="описание издательства"
        />
        <span v-if="errors.description" class="text-red-500">{{ errors.description }}</span>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <ActionButton
        :disabled="!meta.valid || isPublisherCreating || isPublisherUpdating"
        type="submit"
        class="md:max-w-1/3 w-full"
        :title="props.mode === 'create' ? 'Добавить издательство' : 'Изменить издательство'"
      />
    </div>
  </form>
</template>

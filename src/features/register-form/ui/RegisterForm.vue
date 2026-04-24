<script setup lang="ts">
import { registerSchema, type RegisterSchema, useRegister } from '@/entities/auth'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { register, isPending, isError, errorMessage } = useRegister()
const { handleSubmit, errors, defineField, meta, resetForm, values } = useForm<RegisterSchema>({
  validationSchema: toTypedSchema(registerSchema),
})
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [password_confirmation, passwordConfirmAttrs] = defineField('password_confirmation')

const onSubmit = handleSubmit((formValues) => {
  register(formValues)
  resetForm({
    values: formValues,
  })
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <div>
      <Input v-model="name" v-bind="nameAttrs" placeholder="имя" />
      <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
    </div>

    <div>
      <Input v-model="email" v-bind="emailAttrs" placeholder="email" />
      <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
    </div>

    <div class="flex flex-col">
      <Input v-model="password" v-bind="passwordAttrs" placeholder="пароль" type="password" />
      <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
    </div>

    <div class="flex flex-col">
      <Input
        v-model="password_confirmation"
        v-bind="passwordConfirmAttrs"
        placeholder="подтвердите пароль"
        type="password"
      />
      <span v-if="errors.password_confirmation" class="text-red-500">{{
        errors.password_confirmation
      }}</span>
    </div>

    <span v-if="isError && !meta.dirty" class="text-red-500">{{ errorMessage }}</span>

    <ActionButton title="Зарегистрироваться" type="submit" :disabled="!meta.valid || isPending" />
  </form>
</template>

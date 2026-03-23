<script setup lang="ts">
import { type LoginSchema, loginSchema, useLogin } from '@/entities/auth'
import { PUBLIC_URL } from '@/shared/config'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'

const { login, isPending, isError, errorMessage } = useLogin()
const { handleSubmit, errors, defineField, meta, resetForm } = useForm<LoginSchema>({
  validationSchema: toTypedSchema(loginSchema),
})
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((formValues) => {
  login(formValues)
  resetForm({
    values: formValues,
  })
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <div>
      <Input v-model="email" v-bind="emailAttrs" placeholder="email" />
      <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
    </div>

    <div class="flex flex-col">
      <Input v-model="password" v-bind="passwordAttrs" placeholder="пароль" type="password" />
      <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>

      <RouterLink
        :to="PUBLIC_URL.forgotPassword()"
        class="hover:underline cursor-pointer mt-2 w-fit"
        >Забыли пароль?</RouterLink
      >
    </div>

    <span v-if="isError && !meta.dirty" class="text-red-500">{{ errorMessage }}</span>

    <ActionButton title="Войти" type="submit" :disabled="!meta.valid || isPending" />
  </form>
</template>

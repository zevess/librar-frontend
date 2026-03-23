<script setup lang="ts">
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
  resetPasswordSchema,
  type ResetPasswordSchema,
  useForgotPassword,
  useResetPassword,
} from '@/entities/auth'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'

const route = useRoute()

const { resetPassword, isError, errorMessage, isPending, data, isSuccess } = useResetPassword()
const { handleSubmit, errors, defineField, meta, resetForm } = useForm<ResetPasswordSchema>({
  validationSchema: toTypedSchema(resetPasswordSchema),
})

const [password, passwordAttrs] = defineField('password')
const [password_confirmation, passwordConfirmAttrs] = defineField('password_confirmation')
const token = String(route.params.token)
const email = String(route.query.email)

const onSubmit = handleSubmit((formValues) => {
  resetPassword({
    ...formValues,
    token,
    email,
  })
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
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
    <span v-if="isSuccess">{{ data?.data.message }}</span>
    <span v-if="isError && !meta.dirty" class="text-red-500">{{ errorMessage }}</span>

    <ActionButton
      :title="isPending ? 'Пароль сбрасывается' : 'Сохранить пароль'"
      type="submit"
      :disabled="!meta.valid || isPending"
    />
  </form>
</template>

<script setup lang="ts">
import { forgotPasswordSchema, type ForgotPasswordSchema, useForgotPassword } from '@/entities/auth'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { sendResetLink, isError, errorMessage, isPending, data, isSuccess } = useForgotPassword()
const { handleSubmit, errors, defineField, meta, resetForm } = useForm<ForgotPasswordSchema>({
  validationSchema: toTypedSchema(forgotPasswordSchema),
})
const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit(() => {
  sendResetLink(email.value)
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <div>
      <Input v-model="email" v-bind="emailAttrs" placeholder="email" />
      <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
    </div>
    <span v-if="isSuccess">{{ data?.data.message }}</span>
    <span v-if="isError && !meta.dirty" class="text-red-500">{{ errorMessage }}</span>

    <ActionButton
      :title="isPending ? 'Идет отправка' : 'Сбросить пароль'"
      type="submit"
      :disabled="!meta.valid || isPending"
    />
  </form>
</template>

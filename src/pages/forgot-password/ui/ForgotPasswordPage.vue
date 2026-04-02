<script setup lang="ts">
import { ForgotPasswordForm } from '@/features/forgot-password-form'
import { PageTitle } from '@/shared/ui/page-title'
import { Toast } from 'primevue'
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="Сброс пароля"></PageTitle>
    <ForgotPasswordForm />
  </div>
</template>

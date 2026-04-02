<script setup lang="ts">
import { ResetPasswordForm } from '@/features/reset-password-form'
import { PageTitle } from '@/shared/ui/page-title'
import { Toast } from 'primevue'
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="Новый пароль"></PageTitle>
    <ResetPasswordForm />
  </div>
</template>

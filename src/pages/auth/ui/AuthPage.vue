<script setup lang="ts">
import { LoginForm } from '@/features/login-form'
import { RegisterForm } from '@/features/register-form'
import { PageTitle } from '@/shared/ui/page-title'
import { ref } from 'vue'

const isRegister = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle :title="isRegister ? 'Регистрация' : 'Вход'"></PageTitle>
    <LoginForm v-if="!isRegister" />
    <RegisterForm v-if="isRegister" />
    <span @click="isRegister = !isRegister" class="hover:underline cursor-pointer mt-2 w-fit">
      {{ isRegister ? 'Есть аккаунт? Войти' : 'Нет аккаунта? Создать аккаунт' }}</span
    >
  </div>
</template>

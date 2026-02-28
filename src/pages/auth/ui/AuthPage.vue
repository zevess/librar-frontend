<script setup lang="ts">
import { useLogin } from '@/entities/auth'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { PageTitle } from '@/shared/ui/page-title'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// const router = useRouter()
const isRegister = ref<boolean>(false)
const form = ref({
  email: '',
  password: '',
})

const { login, isLoginError, isLoginLoading, isSuccess } = useLogin()

const handleSubmit = () => {
  login(form.value)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle :title="isRegister ? 'Регистрация' : 'Вход'"></PageTitle>
    <form @submit.prevent="handleSubmit" v-if="!isRegister" class="flex flex-col gap-4">
      <Input v-model="form.email" placeholder="email" />
      <Input v-model="form.password" placeholder="пароль" />
      <ActionButton title="Войти" type="submit" :disabled="isLoginLoading" />
    </form>
    <!-- <form action="" v-if="isRegister" class="flex flex-col gap-4">
      <Input placeholder="email" />
      <Input placeholder="пароль" />
      <Input placeholder="подтвердите пароль" />
      <ActionButton title="Зарегистрироваться" />
    </form> -->
    <span @click="isRegister = !isRegister" class="hover:underline cursor-pointer mt-2 w-fit">
      {{ isRegister ? 'Есть аккаунт? Войти' : 'Нет аккаунта? Создать аккаунт' }}</span
    >
  </div>
</template>

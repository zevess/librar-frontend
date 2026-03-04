import { useMutation } from '@tanstack/vue-query'
import type { ILogin, IRegister } from '../model/auth.types'
import { authService } from '../model/auth.service'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { computed, ref } from 'vue'

export const useRegister = () => {
  const { setUser, setToken, initFromCookies } = useUserStore()
  const router = useRouter()

  const errorMessage = ref()

  const {
    mutate: register,
    isPending,
    error,
    isError,
    isSuccess,
    data: user,
  } = useMutation({
    mutationKey: ['register user'],
    mutationFn: (data: IRegister) => authService.register(data),
    onSuccess(data) {
      setUser(data.data.user)
      setToken(data.data.token)
      initFromCookies()
      router.push('/')
    },

    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
      }
    },
  })

  return { register, error, isError, isSuccess, user, isPending, errorMessage }
}

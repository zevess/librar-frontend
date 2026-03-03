import { useMutation } from '@tanstack/vue-query'
import type { ILogin } from '../model/auth.types'
import { authService } from '../model/auth.service'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { computed } from 'vue'

export const useLogin = () => {
  const { setUser, setToken, initFromCookies } = useUserStore()
  const router = useRouter()

  const {
    mutate: login,
    isPending,
    error,
    isError,
    isSuccess,
    data: user,
  } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (data: ILogin) => authService.login(data),
    onSuccess(data) {
      setUser(data.data.user)
      setToken(data.data.token)
      initFromCookies()
      router.push('/')
    },

    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
      }
    },
  })

  return { login, error, isError, isSuccess, user, isPending }
}

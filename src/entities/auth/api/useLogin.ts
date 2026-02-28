import { useMutation } from '@tanstack/vue-query'
import type { ILogin } from '../model/auth.types'
import { authService } from '../model/auth.service'
import { useUserStore } from '@/stores/counter'
import axios from 'axios'

export const useLogin = () => {
  const { setUser } = useUserStore()
  const {
    mutate: login,
    isPending: isLoginLoading,
    error: isLoginError,
    isSuccess,
    data: user,
  } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (data: ILogin) => authService.login(data),
    onSuccess(data) {
      setUser(data.data)
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    },
  })
  return { login, isLoginError, isSuccess, user, isLoginLoading }
}

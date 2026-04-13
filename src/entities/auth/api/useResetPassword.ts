import { useMutation } from '@tanstack/vue-query'
import { authService } from '../model/auth.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { ref } from 'vue'
import type { IResetPassword } from '../model/auth.types'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { useToastStore } from '@/shared/lib'

export const useResetPassword = () => {
  const toast = useToastStore()
  const errorMessage = ref()
  const router = useRouter()
  const {
    mutate: resetPassword,
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['reset password'],
    mutationFn: (data: IResetPassword) => authService.resetPassword(data),
    onSuccess(data) {
      toast.success('Успех', String(data.data.message))
      router.replace(PUBLIC_URL.auth())
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.success('Ошибка', String(error.response?.data.message))
      }
    },
  })

  return { resetPassword, isError, error, errorMessage, isPending, data, isSuccess }
}

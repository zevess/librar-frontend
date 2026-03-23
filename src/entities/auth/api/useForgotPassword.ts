import { useMutation } from '@tanstack/vue-query'
import { authService } from '../model/auth.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { ref } from 'vue'

export const useForgotPassword = () => {
  const toast = useToast()
  const errorMessage = ref()
  const {
    mutate: sendResetLink,
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['forgot password'],
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess(data) {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: String(data.data.message),
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: String(error.response?.data.message),
        })
      }
    },
  })

  return { sendResetLink, isError, error, errorMessage, isPending, data, isSuccess }
}

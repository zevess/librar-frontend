import { useMutation } from '@tanstack/vue-query'
import { authService } from '../model/auth.service'
import axios from 'axios'
import { ref } from 'vue'
import { useToastStore } from '@/shared/lib'

export const useForgotPassword = () => {
  const toast = useToastStore()
  const errorMessage = ref()
  const {
    mutate: sendResetLink,
    data,
    isError: isSendingError,
    error,
    isPending: isLinkSending,
    isSuccess: isLinkSent,
  } = useMutation({
    mutationKey: ['forgot password'],
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess(data) {
      toast.success('Успех', String(data.data.message))
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', String(error.response?.data.message))
      }
    },
  })

  return { sendResetLink, isLinkSending, error, errorMessage, data, isLinkSent, isSendingError }
}

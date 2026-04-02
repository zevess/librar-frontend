import { useMutation } from '@tanstack/vue-query'
import { authService } from '../model/auth.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { ref } from 'vue'
import { useToastStore } from '@/shared/lib'

export const useSendVerification = () => {
  const toast = useToastStore()
  const errorMessage = ref()
  const {
    mutate: sendVerificationLink,
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['send verification'],
    mutationFn: () => authService.sendVerification(),
    onSuccess(data) {
      toast.success('Успех', 'Письмо с подтверждением отправлено на вашу почту')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })

  return { sendVerificationLink, isError, error, errorMessage, isPending, data, isSuccess }
}

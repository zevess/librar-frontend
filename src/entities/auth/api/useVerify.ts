import { useMutation, useQuery } from '@tanstack/vue-query'
import { authService } from '../model/auth.service'
import type { IVerify } from '../model/auth.types'
import { ref } from 'vue'
import { useToast } from 'primevue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { useToastStore } from '@/shared/lib'

export const useVerify = () => {
  const toast = useToastStore()
  const errorMessage = ref()
  const router = useRouter()
  const {
    mutate: verify,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ['verify email'],
    mutationFn: (params: IVerify) => authService.verify(params),
    onSuccess(data) {
      toast.success('Успех', 'Аккаунт подтвержден')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
    onSettled: () => {
      router.push(PUBLIC_URL.profile())
    },
  })

  return { verify, isPending, isSuccess }
}

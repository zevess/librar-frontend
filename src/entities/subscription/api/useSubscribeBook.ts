import { useMutation } from '@tanstack/vue-query'
import { subscriptionService } from '../model/subscription.service'
import { useToast } from 'primevue'
import axios from 'axios'

export const useSubscribeBook = () => {
  const toast = useToast()
  const { mutate: subscribe, isPending: isSubscribing } = useMutation({
    mutationKey: ['subscribe book'],
    mutationFn: (bookId: string) => subscriptionService.subscribeBook(bookId),
    onSuccess() {
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Вы успешно подписались на книгу',
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: String(error.response?.data.message),
        })
      }
    },
  })

  return { subscribe, isSubscribing }
}

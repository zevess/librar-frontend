import { useMutation } from '@tanstack/vue-query'
import { subscriptionService } from '../model/subscription.service'
import { useToast } from 'primevue'
import axios from 'axios'

export const useUnsubscribeBook = () => {
  const toast = useToast()
  const { mutate: unsubscribe, isPending: isUnsubscribing } = useMutation({
    mutationKey: ['unsubscribe book'],
    mutationFn: (bookId: string) => subscriptionService.unsubscribeBook(bookId),
    onSuccess() {
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Вы успешно отписались от книги',
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

  return { unsubscribe, isUnsubscribing }
}

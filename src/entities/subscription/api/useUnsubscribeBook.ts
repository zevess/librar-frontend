import { useMutation } from '@tanstack/vue-query'
import { subscriptionService } from '../model/subscription.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useUnsubscribeBook = () => {
  const toast = useToastStore()
  const { mutate: unsubscribe, isPending: isUnsubscribing } = useMutation({
    mutationKey: ['unsubscribe book'],
    mutationFn: (bookId: string) => subscriptionService.unsubscribeBook(bookId),
    onSuccess() {
      toast.success('Успех', 'Вы успешно подписались на книгу')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })

  return { unsubscribe, isUnsubscribing }
}

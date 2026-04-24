import { useMutation } from '@tanstack/vue-query'
import { subscriptionService } from '../model/subscription.service'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useUnsubscribeBook = () => {
  const toast = useToastStore()
  const {
    mutate: unsubscribe,
    isPending: isUnsubscribing,
    isSuccess,
  } = useMutation({
    mutationKey: ['unsubscribe book'],
    mutationFn: (bookId: string) => subscriptionService.unsubscribeBook(bookId),
    onSuccess() {
      toast.success('Успех', 'Вы успешно отписались от книги')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })

  return { unsubscribe, isUnsubscribing, isSuccess }
}

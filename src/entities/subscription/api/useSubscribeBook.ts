import { useMutation } from '@tanstack/vue-query'
import { subscriptionService } from '../model/subscription.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useSubscribeBook = () => {
  const toast = useToastStore()
  const { mutate: subscribe, isPending: isSubscribing } = useMutation({
    mutationKey: ['subscribe book'],
    mutationFn: (bookId: string) => subscriptionService.subscribeBook(bookId),
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

  return { subscribe, isSubscribing }
}

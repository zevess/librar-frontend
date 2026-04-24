import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'
import { reviewService } from '../model/review.service'

export const useRestoreReview = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: restoreReview } = useMutation({
    mutationKey: ['restore review'],
    mutationFn: (reviewId: string) => reviewService.restoreReview(reviewId),
    onSuccess() {
      toast.success('Статус', 'Отзыв успешно восстановлен')
      queryClient.invalidateQueries({
        queryKey: ['get admin reviews'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })

  return { restoreReview }
}

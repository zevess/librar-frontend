import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reviewService } from '../model/review.service'
import type { IReviewForm } from '../model/review.types'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useCreateReview = (bookId: string) => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: createReview, isPending: isReviewCreating } = useMutation({
    mutationKey: ['create review'],
    mutationFn: (data: IReviewForm) => reviewService.createReview(bookId, data),
    onSuccess() {
      toast.success('Успех', 'Отзыв успешно создан')
      queryClient.invalidateQueries({
        queryKey: ['get book reviews', bookId],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { createReview, isReviewCreating }
}

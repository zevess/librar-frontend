import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reviewService } from '../model/review.service'
import type { IReviewForm } from '../model/review.types'
import { useToast } from 'primevue'
import axios from 'axios'

export const useCreateReview = (bookId: string) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutate: createReview, isPending: isReviewCreating } = useMutation({
    mutationKey: ['create review'],
    mutationFn: (data: IReviewForm) => reviewService.createReview(bookId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get book reviews', bookId],
      })
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Отзыв успешно создан',
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        // errorMessage.value = error.response?.data.message
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: String(error.response?.data.message),
        })
      }
    },
  })
  return { createReview, isReviewCreating }
}

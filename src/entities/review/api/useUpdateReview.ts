import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import { useToastStore } from '@/shared/lib'
import { reviewService } from '../model/review.service'
import type { IReviewForm } from '../model/review.types'

export const useUpdateReview = () => {
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: updateReview, isPending: isReviewUpdating } = useMutation({
    mutationKey: ['update review'],
    mutationFn: ({ data, reviewId }: { data: IReviewForm; reviewId: string }) =>
      reviewService.updateReview(data, reviewId),
    onSuccess() {
      toast.success('Статус', 'Отзыв успешно обновлен')
      queryClient.invalidateQueries({
        queryKey: ['get admin reviews'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { updateReview, isReviewUpdating, errorMessage }
}

import { useQuery } from '@tanstack/vue-query'
import { reviewService } from '../model/review.service'
import type { ComputedRef } from 'vue'

export const useGetBookReviews = (bookId: ComputedRef<string | undefined>) => {
  const {
    data: reviews,
    isFetching,
    isSuccess,
    isFetched: isReviewsFetched,
  } = useQuery({
    queryKey: ['get book reviews', bookId],
    queryFn: () => reviewService.getBookReviews(String(bookId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return { reviews, isFetching, isSuccess, isReviewsFetched }
}

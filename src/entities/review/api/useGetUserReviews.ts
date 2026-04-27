import { useQuery } from '@tanstack/vue-query'
import { reviewService } from '../model/review.service'
import type { ComputedRef } from 'vue'

export const useGetUserReviews = (userId: ComputedRef<number | undefined>) => {
  const {
    data: reviews,
    isFetching: isReviewsFetching,
    isFetched: isReviewsFetched,
    isPending: isReviewsPending,
    isError: isReviewsError,
  } = useQuery({
    queryKey: ['get user reviews', userId],
    queryFn: () => reviewService.getUserReviews(String(userId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: () => !!userId.value,
    retry: false,
  })
  return { reviews, isReviewsFetching, isReviewsPending, isReviewsFetched, isReviewsError }
}

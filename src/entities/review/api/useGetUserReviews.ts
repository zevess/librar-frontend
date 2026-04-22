import { useQuery } from '@tanstack/vue-query'
import { reviewService } from '../model/review.service'
import type { ComputedRef } from 'vue'

export const useGetUserReviews = (userId: ComputedRef<number | undefined>) => {
  const {
    data: reviews,
    isFetching: isReviewsFetching,
    isSuccess,
    isFetched: isReviewsFetched,
  } = useQuery({
    queryKey: ['get user reviews', userId],
    queryFn: () => reviewService.getUserReviews(String(userId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: () => !!userId.value,
  })
  return { reviews, isReviewsFetching, isSuccess, isReviewsFetched }
}

import { useQuery } from '@tanstack/vue-query'
import { type ComputedRef } from 'vue'
import { reviewService } from '../model/review.service'
import type { IReviewParams } from '../model/review.types'

export const useGetAdminReviews = (params?: ComputedRef<IReviewParams>, enabled?: boolean) => {
  const {
    data: reviews,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get admin reviews', params],
    queryFn: () => reviewService.getAdminReviews(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { reviews, isFetching, isFetched, refetch }
}

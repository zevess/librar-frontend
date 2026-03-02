import { useQuery } from '@tanstack/vue-query'
import { reviewService } from '../model/review.service'

export const useGetBookReviews = (id: string) => {
  const {
    data: reviews,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['get reviews', id],
    queryFn: () => reviewService.getBookReviews(id),
  })
  return { reviews, isFetching, isSuccess }
}

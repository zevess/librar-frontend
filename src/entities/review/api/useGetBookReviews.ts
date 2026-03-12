import { useQuery } from '@tanstack/vue-query'
import { reviewService } from '../model/review.service'

export const useGetBookReviews = (bookId: string) => {
  const {
    data: reviews,
    isFetching,
    isSuccess,
    isFetched: isReviewsFetched,
  } = useQuery({
    queryKey: ['get book reviews', bookId],
    queryFn: () => reviewService.getBookReviews(bookId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return { reviews, isFetching, isSuccess, isReviewsFetched }
}

import { api } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { type IReviewsResponse } from './review.types'

class ReviewService {
  async getBookReviews(bookId: string) {
    const { data } = await api<IReviewsResponse>({
      url: API_URL.getBookReviews(bookId),
      method: 'GET',
    })
    return data
  }
}

export const reviewService = new ReviewService()

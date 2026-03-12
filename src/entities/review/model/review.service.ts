import { api, apiPrivate } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { type IReviewForm, type IReviewsResponse } from './review.types'

class ReviewService {
  async createReview(bookId: string, data: IReviewForm) {
    const response = await apiPrivate({
      url: API_URL.createReview(bookId),
      method: 'POST',
      data,
    })
    return response
  }

  async getBookReviews(bookId: string) {
    const { data } = await apiPrivate<IReviewsResponse>({
      url: API_URL.getBookReviews(bookId),
      method: 'GET',
    })
    return data
  }
}

export const reviewService = new ReviewService()

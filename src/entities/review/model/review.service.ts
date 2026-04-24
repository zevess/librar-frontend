import { apiPrivate, type IPaginatedResponse, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import {
  type IReview,
  type IReviewForm,
  type IReviewParams,
  type IReviewsResponse,
} from './review.types'

class ReviewService {
  async createReview(bookId: string, data: IReviewForm) {
    const response = await apiPrivate({
      url: API_URL.createReview(bookId),
      method: 'POST',
      data,
    })
    return response
  }

  async updateReview(data: IReviewForm, reviewId: string) {
    const response = await apiPrivate({
      url: API_URL.updateReview(reviewId),
      method: 'PUT',
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

  async getUserReviews(userId: string) {
    const { data } = await apiPrivate<IResponse<IReview[]>>({
      url: API_URL.getUserReviews(userId),
      method: 'GET',
    })
    return data
  }

  async getAdminReviews(params?: IReviewParams) {
    const { data } = await apiPrivate<IPaginatedResponse<IReview>>({
      url: API_URL.adminReviews(),
      method: 'GET',
      params,
    })
    return data
  }

  async deleteReview(reviewId: string) {
    const response = await apiPrivate({
      url: API_URL.deleteReview(reviewId),
      method: 'DELETE',
      data: reviewId,
    })
    return response
  }
  async restoreReview(reviewId: string) {
    const response = await apiPrivate({
      url: API_URL.restoreReview(reviewId),
      method: 'POST',
    })
    return response
  }
}

export const reviewService = new ReviewService()

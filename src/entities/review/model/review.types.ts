import type { IUser } from '@/entities/user'

export interface IReview {
  id: number
  text: string
  rating: number
  user: IUser
  created_at: Date
}
export interface IReviewsResponse {
  data: IReview[]
  average: number
  hasUserReviewed: boolean
}

export interface IReviewForm {
  text: string
  rating: number
}

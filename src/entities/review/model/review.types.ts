import type { IBook } from '@/entities/book'
import type { IUser } from '@/entities/user'

export interface IReview {
  id: number
  text: string
  rating: number
  user: IUser
  book: IBook
  createdAt: Date
  isDeleted: boolean
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

export interface IReviewParams {
  q?: string | null
  id?: string | null
  bookId?: string | null
  userId?: string | null
  email?: string | null
}

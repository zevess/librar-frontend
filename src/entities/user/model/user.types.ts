import type { IBook } from '@/entities/book'

export interface IUser {
  id: number
  name: string
  email: string
  role: string
  notifications: number
}

export interface IUserResponse {
  user: IUser
}

export interface IUserNotifications {
  id: string
  notifiableId: number
  notificationData: IBook
  readAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserState {
  user: IUser | null
  token: string | null
  isAuthentificated: boolean
  isInitialized: boolean
}

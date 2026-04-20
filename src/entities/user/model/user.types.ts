import type { IBook } from '@/entities/book'

export interface IUser {
  id: number
  name: string
  email: string
  role: string
  notifications: number
  isVerified: boolean
  isDeleted: boolean
}

export interface IUserResponse {
  user: IUser
}

export interface IUserParams {
  id?: string | null
  q?: string | null
  email?: string | null
  role?: string | null
  page: number
}

export interface IUserForm {
  role?: string
  name?: string
  password?: string
}

export enum IUserRole {
  admin = 'Админ',
  librarian = 'Библиотекарь',
  user = 'Пользователь',
}

export const roleArray = Object.entries(IUserRole).map(([value, label]) => ({
  value,
  label,
}))

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

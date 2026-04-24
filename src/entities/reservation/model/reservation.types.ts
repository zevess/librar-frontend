import { type IBook } from '@/entities/book/model/book.types'
import type { IUser } from '@/entities/user'

export interface IReservation {
  id?: number
  book: IBook
  reservedBy: IUser
  expiresAt?: string
  status: keyof typeof IReservationStatus
}

export interface IReservationResponse {
  message: string
  success?: boolean
  reservation: IReservation
}

export interface IReservationParams {
  bookId?: string | null
  email?: string | null
  status?: string | null
  id?: string | null
  page?: number
}

export enum IReservationStatus {
  reserved = 'Забронировано',
  issued = 'Выдано',
  completed = 'Завершено',
  canceled = 'Отменено',
}

export const statusArray = Object.entries(IReservationStatus).map(([value, label]) => ({
  value,
  label,
}))

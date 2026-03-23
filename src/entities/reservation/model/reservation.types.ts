import { bookData, type IBook } from '@/entities/book/model/book.types'
import type { IUser } from '@/entities/user'

export interface IReservation {
  id?: number
  book: IBook
  reservedBy: IUser
  expiresAt?: string
  status: string
}

export interface IReservationResponse {
  message: string
  success?: boolean
  reservation: IReservation
}

export interface IReservationParams {
  bookId?: string
  user?: string
  status?: string
  id?: string
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

// export const reservationStatus = [
//   {
//     status: 'reserved',
//     name: IReservationStatus.RESERVED,
//   },
//   {
//     status: 'issued',
//     name: IReservationStatus.AVAILABLE,
//   },
//   {
//     status: 'completed',
//     name: IReservationStatus.COMPLETED,
//   },
// ]

// export const reservationData: IReservation[] = [
//   {
//     id: 1,
//     book: bookData[0],
//     reservedBy: 12,
//     expiresAt: '12.03.2026',
//     status: IReservationStatus.RESERVED,
//   },
//   {
//     id: 2,
//     book: bookData[1],
//     reservedBy: 12,
//     expiresAt: '12.03.2026',
//     status: IReservationStatus.ISSUED,
//   },
//   {
//     id: 3,
//     book: bookData[2],
//     reservedBy: 12,
//     expiresAt: '12.03.2026',
//     status: IReservationStatus.COMPLETED,
//   },
//   {
//     id: 4,
//     book: bookData[0],
//     reservedBy: 12,
//     expiresAt: '12.03.2026',
//     status: IReservationStatus.RESERVED,
//   },
//   {
//     id: 5,
//     book: bookData[1],
//     reservedBy: 12,
//     expiresAt: '12.03.2026',
//     status: IReservationStatus.ISSUED,
//   },
//   {
//     id: 6,
//     book: bookData[2],
//     reservedBy: 12,
//     expiresAt: '12.03.2026',
//     status: IReservationStatus.COMPLETED,
//   },
// ]

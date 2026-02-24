import { bookData, type IBook } from '@/entities/book/model/book.types'

export interface IReservation {
  reservedBook: IBook
  reservedBy: any
  status: IReservationStatus
}

export enum IReservationStatus {
  RESERVED = 'Забронировано',
  AVAILABLE = 'Доступно',
  ISSUED = 'Выдано',
}

export const reservationData: IReservation = {
  reservedBook: bookData[0],
  status: IReservationStatus.RESERVED,
}

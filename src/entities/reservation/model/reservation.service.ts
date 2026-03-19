import { apiPrivate, type IPaginatedResponse } from '@/shared/api'
import type { IReservationResponse, IReservation, IReservationParams } from './reservation.types'
import { API_URL } from '@/shared/config'

class ReservationService {
  async getReservations(params?: IReservationParams) {
    const { data } = await apiPrivate<IPaginatedResponse<IReservation>>({
      url: API_URL.reservations(),
      method: 'GET',
      params,
    })
    return data
  }

  async getUserReservations(userId?: string) {
    const { data } = await apiPrivate<IPaginatedResponse<IReservation>>({
      url: API_URL.getUserReservations(userId),
      method: 'GET',
    })
    return data
  }

  async createReservation(bookId: string) {
    const response = await apiPrivate<IReservationResponse>({
      url: API_URL.reserveBook(bookId),
      method: 'POST',
      data: {
        bookid: bookId,
      },
    })
    return response
  }
  async cancelReservation(reservationId: string) {
    const response = await apiPrivate<IReservationResponse>({
      url: API_URL.cancelReservation(reservationId),
      method: 'POST',
      data: {
        id: reservationId,
      },
    })
    return response
  }
}

export const reservationService = new ReservationService()

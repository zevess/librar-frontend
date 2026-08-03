import { apiPrivate, type IPaginatedResponse } from '@/shared/api'
import type {
  IReservationResponse,
  IReservation,
  IReservationParams,
  IReservationExportParams,
} from './reservation.types'
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
  async issueReservation(reservationId: string) {
    const response = await apiPrivate<IReservationResponse>({
      url: API_URL.issueReservation(reservationId),
      method: 'POST',
      data: {
        id: reservationId,
      },
    })
    return response
  }
  async acceptReservation(reservationId: string) {
    const response = await apiPrivate<IReservationResponse>({
      url: API_URL.acceptReservation(reservationId),
      method: 'POST',
      data: {
        id: reservationId,
      },
    })
    return response
  }
  async cancelExpired() {
    const response = await apiPrivate({
      url: API_URL.cancelExpired(),
      method: 'PUT',
    })
    return response
  }
  async exportReservations(params?: IReservationExportParams) {
    const response = await apiPrivate({
      url: API_URL.exportReservations(),
      method: 'GET',
      params,
      responseType: 'blob',
    })

    const contentDisposition = response.headers['content-disposition']
    let filename = `reservations_${params?.start_date}_${params?.end_date}.xlsx`

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(
        /filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i,
      )
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1].trim())
      }
    }

    return {
      blob: response.data,
      filename,
    }
  }
}

export const reservationService = new ReservationService()

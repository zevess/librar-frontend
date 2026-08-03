import { useMutation } from '@tanstack/vue-query'
import type { IReservationExportParams } from '../model/reservation.types'
import { reservationService } from '../model/reservation.service'
import { downloadFile } from '@/shared/lib'

export const useExportReservations = () => {
  const {
    mutate: exportReservations,
    data,
    isPending: isReservationsExporting,
    isError: isReservationsError,
  } = useMutation({
    mutationKey: ['export reservations'],
    mutationFn: (params?: IReservationExportParams) =>
      reservationService.exportReservations(params),
    onSuccess: ({ blob, filename }) => {
      downloadFile(blob, filename)
    },
    onError: (error) => {
      console.error('ошибка', error)
    },
  })

  return {
    exportReservations,
    data,
    isReservationsExporting,
    isReservationsError,
  }
}

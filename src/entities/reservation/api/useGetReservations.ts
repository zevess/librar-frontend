import { useQuery } from '@tanstack/vue-query'
import type { IReservationParams } from '../model/reservation.types'
import { reservationService } from '../model/reservation.service'

export const useGetReservations = (params?: IReservationParams) => {
  const {
    data: reservations,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get reservations', params],
    queryFn: () => reservationService.getReservations(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return { reservations, isFetching, isFetched }
}

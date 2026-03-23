import { useQuery } from '@tanstack/vue-query'
import type { IReservationParams } from '../model/reservation.types'
import { reservationService } from '../model/reservation.service'
import type { Ref } from 'vue'

export const useGetReservations = (params?: Ref<IReservationParams>, enabled?: boolean) => {
  const {
    data: reservations,
    isFetching: isReservationsFetching,
    isFetched: isReservationsFetched,
    refetch,
  } = useQuery({
    queryKey: ['get reservations', params],
    queryFn: () => reservationService.getReservations(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })

  return { reservations, isReservationsFetching, isReservationsFetched, refetch }
}

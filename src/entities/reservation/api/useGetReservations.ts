import { useQuery } from '@tanstack/vue-query'
import type { IReservationParams } from '../model/reservation.types'
import { reservationService } from '../model/reservation.service'
import type { ComputedRef, Ref } from 'vue'

export const useGetReservations = (params?: ComputedRef<IReservationParams>, enabled?: boolean) => {
  const {
    data: reservations,
    isFetching: isReservationsFetching,
    isFetched: isReservationsFetched,
    refetch,
  } = useQuery({
    queryKey: ['get reservations', params],
    queryFn: () => reservationService.getReservations(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: enabled,
  })

  return { reservations, isReservationsFetching, isReservationsFetched, refetch }
}

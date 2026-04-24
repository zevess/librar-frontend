import { useQuery } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import type { ComputedRef } from 'vue'

export const useGetUserReservations = (
  userId: ComputedRef<number | undefined>,
  enabled?: boolean,
) => {
  const {
    data: reservations,
    isFetching: isReservationsFetching,
    isFetched: isReservationsFetched,
    refetch,
  } = useQuery({
    queryKey: ['get user reservations', userId],
    queryFn: () => reservationService.getUserReservations(String(userId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: () => !!userId.value,
  })

  return { reservations, isReservationsFetching, isReservationsFetched, refetch }
}

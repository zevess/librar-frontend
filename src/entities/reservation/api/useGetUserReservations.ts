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
    isError: isReservationsError,
    isPending: isReservationsPending,
    refetch,
  } = useQuery({
    queryKey: ['get user reservations', userId],
    queryFn: () => reservationService.getUserReservations(String(userId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: () => !!userId.value,
    retry: false,
  })

  return {
    reservations,
    isReservationsFetching,
    isReservationsFetched,
    refetch,
    isReservationsError,
    isReservationsPending,
  }
}

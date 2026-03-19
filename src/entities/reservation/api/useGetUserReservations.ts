import { useQuery } from '@tanstack/vue-query'
import type { IReservationParams } from '../model/reservation.types'
import { reservationService } from '../model/reservation.service'
import type { ComputedRef, Ref } from 'vue'

export const useGetUserReservations = (
  userId: ComputedRef<number | undefined>,
  enabled?: boolean,
) => {
  const {
    data: reservations,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get user reservations', userId],
    queryFn: () => reservationService.getUserReservations(String(userId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: () => !!userId.value,
  })

  return { reservations, isFetching, isFetched, refetch }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useCancelReservation = (variant: 'profile' | 'admin') => {
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const {
    mutate: cancel,
    isPending: isCanceling,
    isSuccess: isCanceled,
    isError: isCancelError,
  } = useMutation({
    mutationKey: ['cancel reservation'],
    mutationFn: (reservationId: string) => reservationService.cancelReservation(reservationId),
    onSuccess() {
      toast.success('Успех', 'Бронь отменена')
      queryClient.invalidateQueries({
        queryKey: variant == 'admin' ? ['get reservations'] : ['get user reservations'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { cancel, isCancelError, isCanceling, isCanceled }
}

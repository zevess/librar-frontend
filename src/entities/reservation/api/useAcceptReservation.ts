import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useAcceptReservation = () => {
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const { mutate: accept, isPending } = useMutation({
    mutationKey: ['accept reservation'],
    mutationFn: (reservationId: string) => reservationService.acceptReservation(reservationId),
    onSuccess(data) {
      toast.success('Успех', String(data.data.message))
      queryClient.invalidateQueries({
        queryKey: ['get reservations'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { accept, isPending }
}

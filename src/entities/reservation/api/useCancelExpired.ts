import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useCancelExpired = () => {
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const { mutate: cancelExpired, isPending } = useMutation({
    mutationKey: ['cancel expired'],
    mutationFn: () => reservationService.cancelExpired(),
    onSuccess() {
      toast.success('Успех', 'Просроченные брони отменены')
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
  return { cancelExpired, isPending }
}

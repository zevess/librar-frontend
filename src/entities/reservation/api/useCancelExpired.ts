import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import { useToast } from 'primevue'
import { useParams } from '@/features/filter'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useCancelExpired = () => {
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const { params } = useParams()
  const { mutate: cancelExpired, isPending } = useMutation({
    mutationKey: ['cancel expired'],
    mutationFn: () => reservationService.cancelExpired(),
    onSuccess(data) {
      toast.success('Успех', 'Просроченные брони отменены')

      queryClient.invalidateQueries({
        queryKey: ['get reservations', params],
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

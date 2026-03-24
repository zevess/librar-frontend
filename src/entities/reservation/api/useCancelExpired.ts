import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import { useToast } from 'primevue'
import { useParams } from '@/features/filter'
import axios from 'axios'

export const useCancelExpired = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { params } = useParams()
  const { mutate: cancelExpired, isPending } = useMutation({
    mutationKey: ['cancel expired'],
    mutationFn: () => reservationService.cancelExpired(),
    onSuccess(data) {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Просроченнные бронирования отменены',
      })
      queryClient.invalidateQueries({
        queryKey: ['get reservations', params],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: String(error.response?.data.message),
        })
      }
    },
  })
  return { cancelExpired, isPending }
}

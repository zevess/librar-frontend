import { useMutation } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import { useToast } from 'primevue'
import axios from 'axios'

export const useCreateReservation = () => {
  const toast = useToast()
  const {
    mutate: reserve,
    data,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['create reservation'],
    mutationFn: (bookId: string) => reservationService.createReservation(bookId),
    onSuccess(data) {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: String(data.data.message),
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
  return { reserve, isPending, isSuccess, data }
}

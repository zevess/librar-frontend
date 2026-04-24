import { useMutation } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useCreateReservation = () => {
  const toast = useToastStore()
  const {
    mutate: reserve,
    data,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['create reservation'],
    mutationFn: (bookId: string) => reservationService.createReservation(bookId),
    onSuccess() {
      toast.success('Успех', 'Книга успешно забронирована')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { reserve, isPending, isSuccess, data }
}

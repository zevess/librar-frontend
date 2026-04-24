import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useIssueReservation = () => {
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const { mutate: issue, isPending } = useMutation({
    mutationKey: ['issue reservation'],
    mutationFn: (reservationId: string) => reservationService.issueReservation(reservationId),
    onSuccess() {
      toast.success('Успех', 'Книга успешно выдана')
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
  return { issue, isPending }
}

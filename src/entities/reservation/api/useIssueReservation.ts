import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { useParams } from '@/features/filter'
import { useToastStore } from '@/shared/lib'

export const useIssueReservation = () => {
  const toast = useToastStore()
  const queryClient = useQueryClient()
  // const { params } = useParams()
  const { mutate: issue, isPending } = useMutation({
    mutationKey: ['issue reservation'],
    mutationFn: (reservationId: string) => reservationService.issueReservation(reservationId),
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
  return { issue, isPending }
}

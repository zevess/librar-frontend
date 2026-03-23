import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reservationService } from '../model/reservation.service'
import { useToast } from 'primevue'
import axios from 'axios'
import { useParams } from '@/features/filter'

export const useIssueReservation = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { params } = useParams()
  const { mutate: issue, isPending } = useMutation({
    mutationKey: ['issue reservation'],
    mutationFn: (reservationId: string) => reservationService.issueReservation(reservationId),
    onSuccess(data) {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: String(data.data.message),
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
  return { issue, isPending }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { useToastStore } from '@/shared/lib'
import axios from 'axios'
import { publisherService } from '../model/publisher.service'

export const useRestorePublisher = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: restorePublisher } = useMutation({
    mutationKey: ['restore publisher'],
    mutationFn: (publisherId: string) => publisherService.restorePublisher(publisherId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get admin publishers'],
      })
      toast.success('Успех', 'Издатель успешно восстановлен')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { restorePublisher }
}

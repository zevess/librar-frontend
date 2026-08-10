import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import type { IPublisherForm } from '../model/publisher.types'
import { publisherService } from '../model/publisher.service'
import { useToastStore } from '@/shared/lib'

export const useUpdatePublisher = (publisherId: string) => {
  const errorMessage = ref()
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const {
    mutate: updatePublisher,
    isPending: isPublisherUpdating,
    isSuccess: isPublisherSuccess,
    isError: isPublisherError,
  } = useMutation({
    mutationKey: ['update publisher'],
    mutationFn: (data: IPublisherForm) => publisherService.updatePublisher(data, publisherId),
    onSuccess: async (data) => {
      toast.success('Успех', 'Издатель успешно обновлен')
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get publisher', `${data.data.data.slug}-${data.data.data.id}`],
        }),
        queryClient.invalidateQueries({
          queryKey: ['get admin publishers'],
        }),
      ])
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return {
    updatePublisher,
    isPublisherUpdating,
    errorMessage,
    isPublisherError,
    isPublisherSuccess,
  }
}

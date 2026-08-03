import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'
import { publisherService } from '../model/publisher.service'

export const useImportPublishers = () => {
  const errorMessage = ref()
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const {
    mutate: importPublishers,
    isPending: isPublishersImporting,
    isSuccess: isPublishersImported,
    isError: isPublishersError,
  } = useMutation({
    mutationKey: ['import publishers'],
    mutationFn: (data: File) => publisherService.importPublishers(data),
    onSuccess(data) {
      toast.success('Успех', 'Издатели успешно импортированы')
      queryClient.invalidateQueries({
        queryKey: ['get admin publishers'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })

  return {
    importPublishers,
    isPublishersError,
    isPublishersImporting,
    isPublishersImported,
    errorMessage,
  }
}

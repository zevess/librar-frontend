import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { publisherService } from '../model/publisher.service'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'

export const useDeletePublisher = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deletePublisher } = useMutation({
    mutationKey: ['delete publisher'],
    mutationFn: (publisherId: string) => publisherService.deletePublisher(publisherId),
    onSuccess() {
      toast.success('Успех', 'Издатель успешно удален')
      queryClient.invalidateQueries({
        queryKey: ['get all publishers'],
      })
      router.push(PUBLIC_URL.adminPublishers())
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { deletePublisher }
}

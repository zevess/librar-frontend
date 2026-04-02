import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { useToast } from 'primevue'
import { publisherService } from '../model/publisher.service'
import { useToastStore } from '@/shared/lib'

export const useDeletePublisher = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deletePublisher } = useMutation({
    mutationKey: ['delete publisher'],
    mutationFn: (publisherId: string) => publisherService.deletePublisher(publisherId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get all publishers'],
      })
      router.push(PUBLIC_URL.adminPublishers())
      toast.success('Успех', 'Издатель успешно удален')
    },
  })
  return { deletePublisher }
}

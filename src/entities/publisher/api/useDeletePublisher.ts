import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { useToast } from 'primevue'
import { publisherService } from '../model/publisher.service'

export const useDeletePublisher = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutate: deletePublisher } = useMutation({
    mutationKey: ['delete publisher'],
    mutationFn: (publisherId: string) => publisherService.deletePublisher(publisherId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get all publishers'],
      })
      router.push(PUBLIC_URL.adminPublishers())
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Издательство успешно удалено',
        life: 3000,
      })
    },
  })
  return { deletePublisher }
}

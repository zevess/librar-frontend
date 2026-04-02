import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import type { IPublisherForm } from '../model/publisher.types'
import { publisherService } from '../model/publisher.service'
import { useToastStore } from '@/shared/lib'

export const useUpdatePublisher = (publisherId: string) => {
  const router = useRouter()
  const errorMessage = ref()
  const toast = useToastStore()
  const { mutate: updatePublisher, isPending: isPublisherUpdating } = useMutation({
    mutationKey: ['update publisher'],
    mutationFn: (data: IPublisherForm) => publisherService.updatePublisher(data, publisherId),
    onSuccess(data) {
      router.push(PUBLIC_URL.publisher(`${data.data.data.slug}-${data.data.data.id}`))
      toast.success('Успех', 'Издатель успешно обновлен')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { updatePublisher, isPublisherUpdating, errorMessage }
}

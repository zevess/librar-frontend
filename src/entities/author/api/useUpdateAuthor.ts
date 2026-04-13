import { useMutation } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { IAuthorForm } from '../model/author.types'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'primevue'
import { useToastStore } from '@/shared/lib'

export const useUpdateAuthor = (authorId: string) => {
  const router = useRouter()
  const errorMessage = ref()
  const toast = useToastStore()
  const { mutate: updateAuthor, isPending: isAuthorUpdating } = useMutation({
    mutationKey: ['update author'],
    mutationFn: (data: IAuthorForm) => authorService.updateAuthor(data, authorId),
    onSuccess(data) {
      toast.success('Успех', 'Автор успешно обновлен')
      router.push(PUBLIC_URL.author(`${data.data.data.slug}-${data.data.data.id}`))
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { updateAuthor, isAuthorUpdating, errorMessage }
}

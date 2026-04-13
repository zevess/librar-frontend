import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'
import { authorService } from '../model/author.service'

export const useRestoreAuthor = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: restoreAuthor } = useMutation({
    mutationKey: ['restore author'],
    mutationFn: (authorId: string) => authorService.restoreAuthor(authorId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get admin authors'],
      })
      toast.success('Успех', 'Автор успешно восстановлен')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { restoreAuthor }
}

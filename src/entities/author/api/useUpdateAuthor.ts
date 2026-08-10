import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { IAuthorForm } from '../model/author.types'
import axios from 'axios'
import { ref } from 'vue'
import { useToastStore } from '@/shared/lib'

export const useUpdateAuthor = (authorId: string) => {
  const errorMessage = ref()
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const {
    mutate: updateAuthor,
    isPending: isAuthorUpdating,
    isError: isAuthorError,
    isSuccess: isAuthorUpdated,
  } = useMutation({
    mutationKey: ['update author'],
    mutationFn: (data: IAuthorForm) => authorService.updateAuthor(data, authorId),
    onSuccess: async (data) => {
      toast.success('Успех', 'Автор успешно обновлен')
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get author', `${data.data.data.slug}-${data.data.data.id}`],
        }),
        queryClient.invalidateQueries({
          queryKey: ['get admin authors'],
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
  return { updateAuthor, isAuthorUpdating, errorMessage, isAuthorError, isAuthorUpdated }
}

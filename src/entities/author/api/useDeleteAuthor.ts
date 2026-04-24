import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import { useToastStore } from '@/shared/lib'

export const useDeleteAuthor = () => {
  const router = useRouter()
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deleteAuthor, isPending: isAuthorDeleting } = useMutation({
    mutationKey: ['delete author'],
    mutationFn: (authorId: string) => authorService.deleteAuthor(authorId),
    onSuccess() {
      toast.success('Успех', 'Автор успешно удален')
      queryClient.invalidateQueries({
        queryKey: ['get admin authors'],
      })
      router.push(PUBLIC_URL.adminAuthors())
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { deleteAuthor, isAuthorDeleting, errorMessage }
}

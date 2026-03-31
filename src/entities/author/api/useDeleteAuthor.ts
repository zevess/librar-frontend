import { useMutation } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { IAuthorForm } from '../model/author.types'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'primevue'

export const useDeleteAuthor = () => {
  const router = useRouter()
  const errorMessage = ref()
  const toast = useToast()
  const { mutate: deleteAuthor, isPending: isAuthorDeleting } = useMutation({
    mutationKey: ['delete author'],
    mutationFn: (authorId: string) => authorService.deleteAuthor(authorId),
    onSuccess() {
      router.push(PUBLIC_URL.adminAuthors())
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: error.response?.data.message,
        })
      }
    },
  })
  return { deleteAuthor, isAuthorDeleting, errorMessage }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import { useToast } from 'primevue'

export const useDeleteBook = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutate: deleteBook } = useMutation({
    mutationKey: ['delete book'],
    mutationFn: (bookId: string) => bookService.deleteBook(bookId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get books'],
      })
      router.push(PUBLIC_URL.adminBooks())
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Жанр успешно удален',
        life: 3000,
      })
    },
  })
  return { deleteBook }
}

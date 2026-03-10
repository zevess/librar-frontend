import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'

export const useDeleteBook = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: deleteBook } = useMutation({
    mutationKey: ['delete book'],
    mutationFn: (bookId: string) => bookService.deleteBook(bookId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get books'],
      })
      router.push(PUBLIC_URL.adminBooks())
    },
  })
  return { deleteBook }
}

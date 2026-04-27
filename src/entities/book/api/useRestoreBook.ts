import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useRestoreBook = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const {
    mutate: restoreBook,
    isPending: isBookRestoring,
    isSuccess: isBookRestored,
    isError: isBookError,
  } = useMutation({
    mutationKey: ['restore book'],
    mutationFn: (bookId: string) => bookService.restoreBook(bookId),
    onSuccess() {
      toast.success('Успех', 'Книга успешно восстановлена')
      queryClient.invalidateQueries({
        queryKey: ['get admin books'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { restoreBook, isBookError, isBookRestored, isBookRestoring }
}

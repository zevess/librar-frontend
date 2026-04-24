import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useDeleteBook = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deleteBook } = useMutation({
    mutationKey: ['delete book'],
    mutationFn: (bookId: string) => bookService.deleteBook(bookId),
    onSuccess() {
      toast.success('Успех', 'Книга успешно удалена')
      queryClient.invalidateQueries({
        queryKey: ['get admin books'],
      })
      router.push(PUBLIC_URL.adminBooks())
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { deleteBook }
}

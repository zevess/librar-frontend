import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useImportBooks = () => {
  const errorMessage = ref()
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const {
    mutate: importBooks,
    isPending: isBooksImporting,
    isSuccess: isBooksImported,
    isError: isBooksError,
  } = useMutation({
    mutationKey: ['import books'],
    mutationFn: (data: File) => bookService.importBooks(data),
    onSuccess(data) {
      toast.success('Успех', 'Книги успешно импортированы')
      queryClient.invalidateQueries({
        queryKey: ['get admin books'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })

  return { importBooks, isBooksImporting, isBooksImported, isBooksError, errorMessage }
}

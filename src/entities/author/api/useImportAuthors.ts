import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'
import { authorService } from '../model/author.service'

export const useImportAuthors = () => {
  const errorMessage = ref()
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const {
    mutate: importAuthors,
    isPending: isAuthorsImporting,
    isSuccess: isAuthorsImported,
    isError: isAuthorsError,
  } = useMutation({
    mutationKey: ['import authors'],
    mutationFn: (data: File) => authorService.importAuthors(data),
    onSuccess(data) {
      toast.success('Успех', 'Авторы успешно импортированы')
      queryClient.invalidateQueries({
        queryKey: ['get admin authors'],
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

  return { importAuthors, isAuthorsError, isAuthorsImported, isAuthorsImporting, errorMessage }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBookForm } from '../model/book.types'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { PUBLIC_URL } from '@/shared/config'
import { useToast } from 'primevue'
import { useToastStore } from '@/shared/lib'

export const useUpdateBook = (bookId: string) => {
  const router = useRouter()
  const errorMessage = ref()
  const toast = useToastStore()
  const {
    mutate: updateBook,
    isPending: isUpdating,
    isSuccess,
  } = useMutation({
    mutationKey: ['update book'],
    mutationFn: (data: IBookForm) => bookService.updateBook(data, bookId),
    onSuccess(data) {
      router.push(PUBLIC_URL.adminBooks())
      // router.push(PUBLIC_URL.book(`${data.data.data.slug}-${data.data.data.id}`))
      toast.success('Статус', 'Книга успешно обновлена')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })

  return { updateBook, isUpdating, isSuccess, errorMessage }
}

import { useMutation } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBookForm } from '../model/book.types'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { PUBLIC_URL } from '@/shared/config'
import { useToast } from 'primevue'

export const useCreateBook = () => {
  const router = useRouter()
  const errorMessage = ref()
  const toast = useToast()
  const {
    mutate: createBook,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['create book'],
    mutationFn: (data: IBookForm) => bookService.createBook(data),
    onSuccess(data) {
      router.push(PUBLIC_URL.book(`${data.data.data.slug}-${data.data.data.id}`))
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Книга успешно создана',
        life: 3000,
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        errorMessage.value = error.response?.data.message
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: String(error.response?.data.message),
        })
      }
    },
  })

  return { createBook, isPending, isSuccess, errorMessage }
}

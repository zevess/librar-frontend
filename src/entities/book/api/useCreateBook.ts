import { useMutation } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBookCreate } from '../model/book.types'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { PUBLIC_URL } from '@/shared/config'

export const useCreateBook = () => {
  const router = useRouter()
  const errorMessage = ref()
  const {
    mutate: createBook,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['create book'],
    mutationFn: (data: IBookCreate) => bookService.createBook(data),
    onSuccess(data) {
      router.push(PUBLIC_URL.book(`${data.data.data.slug}-${data.data.data.id}`))
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
      }
    },
  })

  return { createBook, isPending, isSuccess, errorMessage }
}

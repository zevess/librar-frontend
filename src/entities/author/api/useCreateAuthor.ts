import { useMutation } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { IAuthorForm } from '../model/author.types'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'primevue'

export const useCreateAuthor = () => {
  const router = useRouter()
  const errorMessage = ref()
  const toast = useToast()
  const { mutate: createAuthor, isPending: isAuthorCreating } = useMutation({
    mutationKey: ['create author'],
    mutationFn: (data: IAuthorForm) => authorService.createAuthor(data),
    onSuccess(data) {
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Автор успешно создан',
        life: 3000,
      })
      router.push(PUBLIC_URL.author(`${data.data.data.slug}-${data.data.data.id}`))
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
  return { createAuthor, isAuthorCreating, errorMessage }
}

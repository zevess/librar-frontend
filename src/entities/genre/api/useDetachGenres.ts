import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import { genreService } from '../model/genre.service'
import type { IGenresParasm } from '../model/genre.types'
import { useToast } from 'primevue'

export const useDetachGenres = (bookId: string) => {
  const router = useRouter()
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutate: detachGenre, isPending: isGenreDetaching } = useMutation({
    mutationKey: ['detach genre'],
    mutationFn: (params: IGenresParasm) => genreService.detachGenresFromBook(bookId, params),
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: String(error.response?.data.message),
        })
      }
    },
  })
  return { detachGenre, isGenreDetaching, errorMessage }
}

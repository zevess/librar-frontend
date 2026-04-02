import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import { genreService } from '../model/genre.service'
import type { IGenresParasm } from '../model/genre.types'
import { useToast } from 'primevue'
import { useToastStore } from '@/shared/lib'

export const useAttachGenres = (bookId: string) => {
  const router = useRouter()
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: attachGenre, isPending: isGenreAttaching } = useMutation({
    mutationKey: ['attach genre'],
    mutationFn: (params: IGenresParasm) => genreService.attachGenresToBook(bookId, params),
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { attachGenre, isGenreAttaching, errorMessage }
}

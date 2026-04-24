import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import { genreService } from '../model/genre.service'
import type { IGenres } from '../model/genre.types'
import { useToastStore } from '@/shared/lib'

export const useDetachGenres = (bookId: string) => {
  const errorMessage = ref()
  const toast = useToastStore()
  const { mutate: detachGenre, isPending: isGenreDetaching } = useMutation({
    mutationKey: ['detach genre'],
    mutationFn: (genres: IGenres) => genreService.detachGenresFromBook(bookId, genres),
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { detachGenre, isGenreDetaching, errorMessage }
}

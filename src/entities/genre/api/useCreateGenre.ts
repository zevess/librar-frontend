import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import type { IGenreForm } from '../model/genre.types'
import { genreService } from '../model/genre.service'
import { useToastStore } from '@/shared/lib'

export const useCreateGenre = () => {
  const router = useRouter()
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: createGenre, isPending: isGenreCreating } = useMutation({
    mutationKey: ['create genre'],
    mutationFn: (data: IGenreForm) => genreService.createGenre(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get genres'],
      })
      router.push(PUBLIC_URL.adminGenres())
      toast.success('Успех', 'Жанр успешно создан')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { createGenre, isGenreCreating, errorMessage }
}

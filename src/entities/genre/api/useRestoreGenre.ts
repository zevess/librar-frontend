import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'
import { genreService } from '../model/genre.service'

export const useRestoreGenre = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: restoreGenre } = useMutation({
    mutationKey: ['restore genre'],
    mutationFn: (genreId: string) => genreService.restoreGenre(genreId),
    onSuccess() {
      toast.success('Успех', 'Жанр успешно восстановлен')
      queryClient.invalidateQueries({
        queryKey: ['get admin genres'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { restoreGenre }
}

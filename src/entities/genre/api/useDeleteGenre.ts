import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { genreService } from '../model/genre.service'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'

export const useDeleteGenre = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deleteGenre } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (genreId: string) => genreService.deleteGenre(genreId),
    onSuccess() {
      toast.success('Успех', 'Жанр успешно удален')
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

  return { deleteGenre }
}

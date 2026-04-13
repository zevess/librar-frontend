import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { genreService } from '../model/genre.service'
import { useToast } from 'primevue'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'

export const useDeleteGenre = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deleteGenre } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (genreId: string) => genreService.deleteGenre(genreId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get genres'],
      })
      toast.success('Успех', 'Жанр успешно удален')
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

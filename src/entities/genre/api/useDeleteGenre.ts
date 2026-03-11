import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { genreService } from '../model/genre.service'
import { useToast } from 'primevue'

export const useDeleteGenre = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutate: deleteGenre } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (genreId: string) => genreService.deleteGenre(genreId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get genres'],
      })
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: 'Жанр успешно удален',
        life: 3000,
      })
    },
  })

  return { deleteGenre }
}

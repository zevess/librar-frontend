import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { genreService } from '../model/genre.service'

export const useDeleteGenre = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteGenre } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (genreId: string) => genreService.deleteGenre(genreId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get genres'],
      })
    },
  })

  return { deleteGenre }
}

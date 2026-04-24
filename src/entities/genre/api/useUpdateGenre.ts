import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import type { IGenreForm } from '../model/genre.types'
import { genreService } from '../model/genre.service'
import { useToastStore } from '@/shared/lib'

export const useUpdateGenre = () => {
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: updateGenre, isPending: isGenreUpdating } = useMutation({
    mutationKey: ['create genre'],
    mutationFn: ({ data, genreId }: { data: IGenreForm; genreId: string }) =>
      genreService.updateGenre(data, genreId),
    onSuccess() {
      toast.success('Успех', 'Жанр успешно обновлен')
      queryClient.invalidateQueries({
        queryKey: ['get admin genres'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { updateGenre, isGenreUpdating, errorMessage }
}

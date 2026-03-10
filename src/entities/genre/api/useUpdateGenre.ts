import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import type { IGenreForm } from '../model/genre.types'
import { genreService } from '../model/genre.service'

export const useUpdateGenre = () => {
  const router = useRouter()
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const { mutate: updateGenre, isPending: isGenreUpdating } = useMutation({
    mutationKey: ['create genre'],
    mutationFn: ({ data, genreId }: { data: IGenreForm; genreId: string }) =>
      genreService.updateGenre(data, genreId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get genres'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
      }
    },
  })
  return { updateGenre, isGenreUpdating, errorMessage }
}

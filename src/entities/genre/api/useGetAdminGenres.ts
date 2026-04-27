import { useQuery } from '@tanstack/vue-query'
import { type ComputedRef } from 'vue'
import type { IGenresParams } from '../model/genre.types'
import { genreService } from '../model/genre.service'

export const useGetAdminGenres = (params?: ComputedRef<IGenresParams>, enabled?: boolean) => {
  const {
    data: genres,
    isFetching: isGenresFetching,
    isFetched: isGenresFetched,
    isPending: isGenresPending,
    isError: isGenresError,
    refetch,
  } = useQuery({
    queryKey: ['get admin genres', params],
    queryFn: () => genreService.getAdminGenres(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { genres, isGenresFetching, refetch, isGenresFetched, isGenresPending, isGenresError }
}

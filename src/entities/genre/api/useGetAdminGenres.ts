import { useQuery } from '@tanstack/vue-query'
import { computed, type ComputedRef, type Ref } from 'vue'
import type { IGenresParams } from '../model/genre.types'
import { genreService } from '../model/genre.service'

export const useGetAdminGenres = (params?: ComputedRef<IGenresParams>, enabled?: boolean) => {
  const {
    data: genres,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get admin genres', params],
    queryFn: () => genreService.getAdminGenres(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { genres, isFetching, isFetched, refetch }
}

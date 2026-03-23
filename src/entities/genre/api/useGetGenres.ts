import { useQuery } from '@tanstack/vue-query'
import { genreService } from '../model/genre.service'

export const useGetGenres = () => {
  const {
    data: genres,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get genres'],
    queryFn: () => genreService.getGenres(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  return { genres, isFetching, isFetched }
}

import { useQuery } from '@tanstack/vue-query'
import { genreService } from '../model/genre.service'

export const useGetGenres = () => {
  const { data: genres } = useQuery({
    queryKey: ['get genres'],
    queryFn: () => genreService.getGenres(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  return { genres }
}

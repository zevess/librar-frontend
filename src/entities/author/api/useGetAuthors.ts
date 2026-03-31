import { useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { IAuthorParams } from '../model/author.types'

export const useGetAuthors = (params?: IAuthorParams) => {
  const {
    data: authors,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get authors', params],
    queryFn: () => authorService.getAuthors(params),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  return { authors, isFetching, isFetched }
}

import { useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { IAuthorParams } from '../model/author.types'

export const useGetAdminAuthors = (params?: IAuthorParams) => {
  const {
    data: authors,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get admin authors', params],
    queryFn: () => authorService.getAdminAuthors(params),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  return { authors, isFetching, isFetched }
}

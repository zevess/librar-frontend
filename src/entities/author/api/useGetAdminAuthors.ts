import { useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { IAuthorParams } from '../model/author.types'
import type { ComputedRef } from 'vue'

export const useGetAdminAuthors = (params?: ComputedRef<IAuthorParams>) => {
  const {
    data: authors,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get admin authors', params],
    queryFn: () => authorService.getAdminAuthors(params?.value),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  return { authors, isFetching, isFetched }
}

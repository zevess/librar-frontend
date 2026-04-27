import { useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'
import type { ComputedRef } from 'vue'

export const useGetAuthor = (slug: ComputedRef<string | string[] | undefined>) => {
  const {
    data: author,
    isFetching: isAuthorFetching,
    isFetched: isAuthorFetched,
    isPending: isAuthorPending,
    isError: isAuthorError,
  } = useQuery({
    queryKey: ['get author', slug],
    queryFn: () => authorService.getAuthorBySlug(String(slug.value)),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  return { author, isAuthorError, isAuthorFetched, isAuthorFetching, isAuthorPending }
}

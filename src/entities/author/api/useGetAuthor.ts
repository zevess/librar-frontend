import { useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'

export const useGetAuthor = (slug: string) => {
  const {
    data: author,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get author', slug],
    queryFn: () => authorService.getAuthorBySlug(slug),
    refetchOnMount: true,
  })
  return { author, isFetching, isFetched }
}

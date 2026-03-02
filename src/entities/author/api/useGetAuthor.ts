import { useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'

export const useGetAuthor = (slug: string) => {
  const { data: author, isLoading } = useQuery({
    queryKey: ['get author', slug],
    queryFn: () => authorService.getAuthorBySlug(slug),
    refetchOnMount: true,
  })
  return { author, isLoading }
}

import { useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'

export const useGetAuthor = (slug: string) => {
  const { data: author, isLoading } = useQuery({
    queryKey: ['get author'],
    queryFn: () => authorService.getAuthorBySlug(slug),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  return { author, isLoading }
}

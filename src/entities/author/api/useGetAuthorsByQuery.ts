import { useMutation, useQuery } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'

export const useGetAuthorsByQuery = () => {
  const {
    mutate: findAuthor,
    data: authors,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['get authors by query'],
    mutationFn: (query: string) => authorService.getAuthorsByQuery(query),
  })
  return { findAuthor, authors, isPending, isSuccess }
}

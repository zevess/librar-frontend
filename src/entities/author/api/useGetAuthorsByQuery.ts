import { useMutation } from '@tanstack/vue-query'
import { authorService } from '../model/author.service'

export const useGetAuthorsByQuery = () => {
  const {
    mutate: findAuthor,
    data: authors,
    isPending: isAuthorsPending,
    isSuccess: isAuthorsSuccess,
  } = useMutation({
    mutationKey: ['get authors by query'],
    mutationFn: (query: string) => authorService.getAuthorsByQuery(query),
  })
  return { findAuthor, authors, isAuthorsPending, isAuthorsSuccess }
}

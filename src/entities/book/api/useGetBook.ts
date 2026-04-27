import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { ComputedRef } from 'vue'

export const useGetBook = (slug: ComputedRef<string | string[] | undefined>) => {
  const {
    data: book,
    isFetching: isBookFetching,
    isFetched: isBookFetched,
    isPending: isBookPending,
    isError: isBookError,
    refetch,
  } = useQuery({
    queryKey: ['get book', slug],
    queryFn: () => bookService.getBookBySlug(String(slug.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return { book, isBookError, isBookFetched, isBookFetching, isBookPending, refetch }
}

import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { ComputedRef } from 'vue'

export const useGetBook = (slug: ComputedRef<string | string[] | undefined>) => {
  const {
    data: book,
    isFetching,
    isFetched,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['get book', slug],
    queryFn: () => bookService.getBookBySlug(String(slug.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return { book, isFetching, isFetched, isSuccess, refetch }
}

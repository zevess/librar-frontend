import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBooksParams } from '../model/book.types'
import { type ComputedRef } from 'vue'

export const useGetBooks = (params?: ComputedRef<IBooksParams>, enabled?: boolean) => {
  const {
    data: books,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get books', params],
    queryFn: () => bookService.getBooks(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { books, isFetching, isFetched, refetch }
}

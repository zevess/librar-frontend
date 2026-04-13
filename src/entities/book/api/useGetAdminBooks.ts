import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBook, IBooksParams } from '../model/book.types'
import { computed } from 'vue'

export const useGetAdminBooks = (params?: IBooksParams, enabled?: boolean) => {
  const {
    data: books,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get admin books', params],
    queryFn: () => bookService.getAdminBooks(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { books, isFetching, isFetched, refetch }
}

import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBook, IBooksParams } from '../model/book.types'
import { computed, type ComputedRef, type Ref } from 'vue'

export const useGetAdminBooks = (params?: ComputedRef<IBooksParams>, enabled?: boolean) => {
  const {
    data: books,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get admin books', params],
    queryFn: () => bookService.getAdminBooks(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { books, isFetching, isFetched, refetch }
}

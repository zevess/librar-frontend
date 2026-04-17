import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBook, IBooksParams } from '../model/book.types'
import { computed, type Ref } from 'vue'

export const useGetBooks = (params?: Ref<IBooksParams>, enabled?: boolean) => {
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

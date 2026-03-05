import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBook, IBooksParams } from '../model/book.types'
import { computed } from 'vue'

export const useGetBooks = (params?: IBooksParams) => {
  const { data: books, isLoading } = useQuery({
    queryKey: ['get books', params],
    queryFn: () => bookService.getBooks(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  return { books, isLoading }
}

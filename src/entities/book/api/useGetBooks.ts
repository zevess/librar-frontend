import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'
import type { IBook } from '../model/book.types'
import { computed } from 'vue'

export const useGetBooks = () => {
  const { data: books, isLoading } = useQuery({
    queryKey: ['get books'],
    queryFn: () => bookService.getBooks(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  return { books, isLoading }
}

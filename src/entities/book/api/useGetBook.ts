import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'

export const useGetBook = (slug: string) => {
  const { data: book, isLoading } = useQuery({
    queryKey: ['get book'],
    queryFn: () => bookService.getBookBySlug(slug),
  })
  return { book, isLoading }
}

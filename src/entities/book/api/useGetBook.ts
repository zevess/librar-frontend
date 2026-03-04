import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'

export const useGetBook = (slug: string) => {
  const {
    data: book,
    isFetching,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ['get book', slug],
    queryFn: () => bookService.getBookBySlug(slug),
    refetchOnWindowFocus: false,
  })
  return { book, isFetching, isFetched, isSuccess }
}

import { useQuery } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const useGetBook = (slug: string) => {
  const {
    data: book,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['get book', slug],
    // queryFn: async () => await delay(10000),
    queryFn: () => bookService.getBookBySlug(slug),
  })
  return { book, isFetching, isSuccess }
}

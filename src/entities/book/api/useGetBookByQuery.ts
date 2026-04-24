import { useMutation } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'

export const useGetBooksByQuery = () => {
  const {
    mutate: findBook,
    data: books,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['get books by query'],
    mutationFn: (query: string) => bookService.getBooksByQuery(query),
  })
  return { findBook, books, isPending, isSuccess }
}

import { useMutation } from '@tanstack/vue-query'
import { bookService } from '../model/book.service'

export const useGetBooksByQuery = () => {
  const {
    mutate: findBook,
    data: books,
    isSuccess: isBooksSuccess,
    isPending: isBooksPending,
    isError: isBooksError,
  } = useMutation({
    mutationKey: ['get books by query'],
    mutationFn: (query: string) => bookService.getBooksByQuery(query),
  })
  return { findBook, books, isBooksError, isBooksSuccess, isBooksPending }
}

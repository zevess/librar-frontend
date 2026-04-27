import { BookStatus, type IBooksParams } from '@/entities/book'
import { bookService } from '@/entities/book/model/book.service'
import { useQuery } from '@tanstack/vue-query'
import { type ComputedRef } from 'vue'

export const useBookSections = (params?: ComputedRef<IBooksParams>, enabled?: boolean) => {
  const {
    data: books,
    isFetching: isBooksFetching,
    isFetched: isBooksFetched,
    isPending: isBooksPending,
    isError: isBooksError,
    refetch,
  } = useQuery({
    queryKey: ['get book sections', params?.value],
    queryFn: () =>
      bookService.getBooks({
        ...params?.value,
        sort: 'created_at',
        status: BookStatus.AVAILABLE,
        perPage: 6,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { books, isBooksError, isBooksFetched, isBooksFetching, isBooksPending, refetch }
}

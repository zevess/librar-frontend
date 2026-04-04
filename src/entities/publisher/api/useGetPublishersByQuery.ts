import { useMutation, useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'

export const useGetPublishersByQuery = () => {
  const {
    mutate: findPublisher,
    data: publishers,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['get publishers by query'],
    mutationFn: (query: string) => publisherService.getPublishersByQuery(query),
  })
  return { findPublisher, publishers, isPending, isSuccess }
}

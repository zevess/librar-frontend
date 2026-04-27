import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'
import type { IPublisherParams } from '../model/publisher.types'

export const useGetPublishers = (params?: IPublisherParams) => {
  const {
    data: publishers,
    isFetching: isPublishersFetching,
    isFetched: isPublishersFetched,
    isPending: isPublishersPending,
    isError: isPublishersError,
  } = useQuery({
    queryKey: ['get publishers', params],
    queryFn: () => publisherService.getPublishers(params),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return {
    publishers,
    isPublishersFetching,
    isPublishersFetched,
    isPublishersPending,
    isPublishersError,
  }
}

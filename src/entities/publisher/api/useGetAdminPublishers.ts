import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'
import type { IPublisherParams } from '../model/publisher.types'
import type { ComputedRef } from 'vue'

export const useGetAdminPublishers = (params?: ComputedRef<IPublisherParams>) => {
  const {
    data: publishers,
    isFetching: isPublishersFetching,
    isFetched: isPublishersFetched,
    isPending: isPublishersPending,
    isError: isPublishersError,
  } = useQuery({
    queryKey: ['get admin publishers', params],
    queryFn: () => publisherService.getAdminPublishers(params?.value),
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

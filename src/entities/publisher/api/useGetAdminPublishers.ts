import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'
import type { IPublisherParams } from '../model/publisher.types'

export const useGetAdminPublishers = (params?: IPublisherParams) => {
  const {
    data: publishers,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get admin publishers', params],
    queryFn: () => publisherService.getAdminPublishers(params),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return { publishers, isFetching, isFetched }
}

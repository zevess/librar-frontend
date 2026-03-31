import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'
import type { IPublisherParams } from '../model/publisher.types'

export const useGetPublishers = (params?: IPublisherParams) => {
  const {
    data: publishers,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get publishers', params],
    queryFn: () => publisherService.getPublishers(params),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return { publishers, isFetching, isFetched }
}

import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'

export const useGetPublishers = () => {
  const {
    data: publishers,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get publishers'],
    queryFn: () => publisherService.getPublishers(),
    refetchOnWindowFocus: false,
  })
  return { publishers, isFetching, isFetched }
}

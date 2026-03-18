import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'

export const useGetAllPublishers = () => {
  const {
    data: publishers,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get all publishers'],
    queryFn: () => publisherService.getAllPublishers(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  return { publishers, isFetching, isFetched }
}

import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'

export const useGetAllPublishers = () => {
  const {
    data: publishers,
    isFetching: isPublishersFetching,
    isFetched: isPublishersFetched,
    isPending: isPublishersPending,
    isError: isPublishersError,
  } = useQuery({
    queryKey: ['get all publishers'],
    queryFn: () => publisherService.getAllPublishers(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  return {
    publishers,
    isPublishersFetching,
    isPublishersFetched,
    isPublishersPending,
    isPublishersError,
  }
}

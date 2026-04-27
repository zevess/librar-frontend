import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'
import type { ComputedRef } from 'vue'

export const useGetPublisher = (slug: ComputedRef<string | string[] | undefined>) => {
  const {
    data: publisher,
    isFetching: isPublisherFetching,
    isFetched: isPublisherFetched,
    isPending: isPublisherPending,
    isError: isPublisherError,
  } = useQuery({
    queryKey: ['get publisher'],
    queryFn: () => publisherService.getPublisherBySlug(String(slug.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return {
    publisher,
    isPublisherError,
    isPublisherFetched,
    isPublisherFetching,
    isPublisherPending,
  }
}

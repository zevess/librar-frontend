import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'
import type { ComputedRef } from 'vue'

export const useGetPublisher = (slug: ComputedRef<string | string[] | undefined>) => {
  const {
    data: publisher,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['get publisher'],
    queryFn: () => publisherService.getPublisherBySlug(String(slug.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
  return { publisher, isFetching, isFetched }
}

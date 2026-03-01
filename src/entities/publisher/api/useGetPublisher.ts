import { useQuery } from '@tanstack/vue-query'
import { publisherService } from '../model/publisher.service'

export const useGetPublisher = (slug: string) => {
  const { data: publisher, isLoading } = useQuery({
    queryKey: ['get publisher'],
    queryFn: () => publisherService.getPublisherBySlug(slug),
  })
  return { publisher, isLoading }
}

import { api, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import type { IPublisher } from './publisher.types'

class PublisherService {
  async getPublishers() {
    const { data } = await api<IPublisher[]>({
      url: API_URL.publishers(),
      method: 'GET',
    })
    return data
  }
  async getPublisherBySlug(slug: string) {
    const { data } = await api<IResponse<IPublisher>>({
      url: API_URL.getPublisherBySlugAndId(slug),
      method: 'GET',
    })
    return data
  }
}

export const publisherService = new PublisherService()

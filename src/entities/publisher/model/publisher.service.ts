import { api, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import type { IPublisher } from './publisher.types'

class PublisherService {
  async getPublisherBySlug(slug: string) {
    const { data } = await api<IResponse<IPublisher>>({
      url: API_URL.getPublisherBySlugAndId(slug),
      method: 'GET',
    })
    return data
  }
}

export const publisherService = new PublisherService()

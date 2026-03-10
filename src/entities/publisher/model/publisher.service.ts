import { api, apiPrivate, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import type { IPublisher, IPublisherForm } from './publisher.types'

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
  async createPublisher(data: IPublisherForm) {
    const response = await apiPrivate<IResponse<IPublisher>>({
      url: API_URL.createPublisher(),
      method: 'POST',
      data,
    })
    return response
  }
  async updatePublisher(data: IPublisherForm, publisherId: string) {
    const response = await apiPrivate<IResponse<IPublisher>>({
      url: API_URL.updatePublisher(publisherId),
      method: 'PUT',
      data,
    })
    return response
  }
}

export const publisherService = new PublisherService()

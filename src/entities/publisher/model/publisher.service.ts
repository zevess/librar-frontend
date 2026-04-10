import { api, apiPrivate, type IPaginatedResponse, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import type { IPublisher, IPublisherForm, IPublisherParams } from './publisher.types'

class PublisherService {
  async getAllPublishers() {
    const { data } = await api<IResponse<IPublisher[]>>({
      url: API_URL.publishers('/get'),
      method: 'GET',
    })
    return data
  }

  async getPublishers(params?: IPublisherParams) {
    const { data } = await api<IPaginatedResponse<IPublisher>>({
      url: API_URL.publishers(),
      method: 'GET',
      params,
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

  async getPublishersByQuery(q: string) {
    const { data } = await api<IResponse<IPublisher[]>>({
      url: API_URL.getPublishersByQuery(),
      method: 'GET',
      params: {
        q,
      },
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
  async deletePublisher(publisherId: string) {
    const response = await apiPrivate<IResponse<IPublisher>>({
      url: API_URL.deletePublisher(publisherId),
      method: 'DELETE',
    })
    return response
  }
  async restorePublisher(publisherId: string) {
    const response = await apiPrivate({
      url: API_URL.restorePublisher(publisherId),
      method: 'POST',
    })
    return response
  }
}

export const publisherService = new PublisherService()

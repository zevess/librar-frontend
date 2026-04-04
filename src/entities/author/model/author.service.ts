import { api, apiPrivate, type IPaginatedResponse, type IResponse } from '@/shared/api'
import { type IAuthor, type IAuthorForm, type IAuthorParams } from './author.types'
import { API_URL } from '@/shared/config'

class AuthorService {
  async getAuthors(params?: IAuthorParams) {
    const { data } = await api<IPaginatedResponse<IAuthor>>({
      url: API_URL.getAuthors(),
      method: 'GET',
      params,
    })
    return data
  }

  async getAuthorBySlug(slug: string) {
    const { data } = await api<IResponse<IAuthor>>({
      url: API_URL.getAuthorBySlug(slug),
      method: 'GET',
    })
    return data
  }

  async getAuthorsByQuery(q: string) {
    const { data } = await api<IResponse<IAuthor[]>>({
      url: API_URL.getAuthorsByQuery(),
      method: 'GET',
      params: {
        q,
      },
    })
    return data
  }

  async createAuthor(data: IAuthorForm) {
    const response = await apiPrivate<IResponse<IAuthor>>({
      url: API_URL.createAuthor(),
      method: 'POST',
      data,
    })
    return response
  }
  async updateAuthor(data: IAuthorForm, authorId: string) {
    const response = await apiPrivate<IResponse<IAuthor>>({
      url: API_URL.updateAuthor(authorId),
      method: 'PUT',
      data,
    })
    return response
  }
  async deleteAuthor(authorId: string) {
    const response = await apiPrivate({
      url: API_URL.deleteAuthor(authorId),
      method: 'DELETE',
      data: authorId,
    })
  }
}
export const authorService = new AuthorService()

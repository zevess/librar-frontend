import { api, apiPrivate, type IResponse } from '@/shared/api'
import { type IAuthor, type IAuthorForm } from './author.types'
import { API_URL } from '@/shared/config'

class AuthorService {
  async getAuthorBySlug(slug: string) {
    const { data } = await api<IResponse<IAuthor>>({
      url: API_URL.getAuthorBySlug(slug),
      method: 'GET',
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
}
export const authorService = new AuthorService()

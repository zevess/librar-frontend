import { api, type IResponse } from '@/shared/api'
import { type IAuthor } from './author.types'
import { API_URL } from '@/shared/config'

class AuthorService {
  async getAuthorBySlug(slug: string) {
    const { data } = await api<IResponse<IAuthor>>({
      url: API_URL.getAuthorBySlug(slug),
      method: 'GET',
    })
    return data
  }
}
export const authorService = new AuthorService()

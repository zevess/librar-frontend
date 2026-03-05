import { api, type IPaginatedResponse, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { type IBook, type IBooksParams } from './book.types'

class BookService {
  async getBooks(params?: IBooksParams) {
    const { data } = await api<IPaginatedResponse<IBook>>({
      url: API_URL.books(),
      method: 'GET',
      params: params,
    })
    return data
  }
  async getBook(id: string) {
    const { data } = await api<IResponse<IBook>>({
      url: API_URL.getBookById(id),
      method: 'GET',
    })
    return data
  }
  async getBookBySlug(slug: string) {
    const { data } = await api<IResponse<IBook>>({
      url: API_URL.getBookBySlug(slug),
      method: 'GET',
    })
    return data
  }
}
export const bookService = new BookService()

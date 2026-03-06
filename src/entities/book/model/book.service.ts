import { api, apiPrivate, type IPaginatedResponse, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { type IBook, type IBookCreate, type IBooksParams } from './book.types'

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
  async createBook(data: IBookCreate) {
    const response = await apiPrivate<IResponse<IBook>>({
      url: API_URL.createBook(),
      method: 'POST',
      data,
    })
    return response
  }
}
export const bookService = new BookService()

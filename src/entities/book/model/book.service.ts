import { api, apiPrivate, type IPaginatedResponse, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { type IBook, type IBookForm, type IBooksParams } from './book.types'

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
    const { data } = await apiPrivate<IResponse<IBook>>({
      url: API_URL.getBookBySlug(slug),
      method: 'GET',
    })
    return data
  }
  async createBook(data: IBookForm) {
    const response = await apiPrivate<IResponse<IBook>>({
      url: API_URL.createBook(),
      method: 'POST',
      data,
    })
    return response
  }
  async updateBook(data: IBookForm, bookId: string) {
    const response = await apiPrivate<IResponse<IBook>>({
      url: API_URL.updateBook(bookId),
      method: 'PUT',
      data,
    })
    return response
  }
  async deleteBook(bookId: string) {
    const response = await apiPrivate({
      url: API_URL.deleteBook(bookId),
      method: 'DELETE',
      data: bookId,
    })
    return response
  }
}
export const bookService = new BookService()

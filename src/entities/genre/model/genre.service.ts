import { api, apiPrivate, type IPaginatedResponse, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import type { IGenre, IGenreForm, IGenresParams, IGenresParasm } from './genre.types'

class GenreService {
  async getGenres() {
    const { data } = await api<IResponse<IGenre[]>>({
      url: API_URL.genres(),
      method: 'GET',
    })
    return data
  }
  async getAdminGenres(params?: IGenresParams) {
    const { data } = await apiPrivate<IResponse<IGenre[]>>({
      url: API_URL.adminGenres(),
      method: 'GET',
      params,
    })
    return data
  }
  async createGenre(data: IGenreForm) {
    const response = await apiPrivate<IResponse<IGenre>>({
      url: API_URL.createGenre(),
      method: 'POST',
      data,
    })
    return response
  }

  async updateGenre(data: IGenreForm, genreId: string) {
    const response = await apiPrivate<IResponse<IGenre>>({
      url: API_URL.updateGenre(genreId),
      method: 'PUT',
      data,
    })
    return response
  }

  async attachGenresToBook(bookId: string, params: IGenresParasm) {
    const response = await apiPrivate({
      url: API_URL.attachGenre(bookId),
      method: 'POST',
      params,
    })
    return response
  }
  async detachGenresFromBook(bookId: string, params: IGenresParasm) {
    const response = await apiPrivate({
      url: API_URL.detachGenre(bookId),
      method: 'DELETE',
      params,
    })
    return response
  }
  async deleteGenre(genreId: string) {
    const response = await apiPrivate({
      url: API_URL.deleteGenre(genreId),
      method: 'DELETE',
      data: genreId,
    })
    return response
  }
  async restoreGenre(genreId: string) {
    const response = await apiPrivate({
      url: API_URL.restoreGenre(genreId),
      method: 'POST',
    })
    return response
  }
}

export const genreService = new GenreService()

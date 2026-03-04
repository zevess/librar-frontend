import { api, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import type { IGenre } from './genre.types'

class GenreService {
  async getGenres() {
    const { data } = await api<IResponse<IGenre[]>>({
      url: API_URL.genres(),
      method: 'GET',
    })
    return data
  }
}

export const genreService = new GenreService()

import { api, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { type ICategory } from './category.types'

class CategoryService {
  async getCategories() {
    const { data } = await api<IResponse<ICategory[]>>({
      url: API_URL.categories(),
      method: 'GET',
    })
    return data
  }
}

export const categoryService = new CategoryService()

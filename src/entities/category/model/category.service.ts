import { api, apiPrivate, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { type ICategory, type ICategoryForm } from './category.types'

class CategoryService {
  async getCategories() {
    const { data } = await api<IResponse<ICategory[]>>({
      url: API_URL.categories(),
      method: 'GET',
    })
    return data
  }

  async getCategoriesByQuery(q: string) {
    const { data } = await api<IResponse<ICategory[]>>({
      url: API_URL.getCategoriesByQuery(),
      method: 'GET',
      params: {
        q,
      },
    })
    return data
  }

  async getCategory(categoryId: string) {
    const { data } = await api<IResponse<ICategory>>({
      url: API_URL.getCategoryById(categoryId),
      method: 'GET',
    })
    return data
  }
  async createCategory(data: ICategoryForm) {
    const response = await apiPrivate<IResponse<ICategory>>({
      url: API_URL.createCategory(),
      method: 'POST',
      data,
    })
    return response
  }
  async updateCategory(data: ICategoryForm, categoryId: string) {
    const response = await apiPrivate<IResponse<ICategory>>({
      url: API_URL.updateCategory(categoryId),
      method: 'PUT',
      data,
    })
    return response
  }
  async deleteCategory(categoryId: string) {
    const response = await apiPrivate({
      url: API_URL.deleteCategory(categoryId),
      method: 'DELETE',
      data: categoryId,
    })
    return response
  }
}

export const categoryService = new CategoryService()

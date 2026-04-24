export interface ICategory {
  id: number
  name: string
  slug: string
  description?: string
  isDeleted?: boolean
}

export interface ICategoryForm {
  name: string
  description?: string
}

export interface ICategoriesParams {
  q?: string | null
  id?: string | null
  page?: number
}

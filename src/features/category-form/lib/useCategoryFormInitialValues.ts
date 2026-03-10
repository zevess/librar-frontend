import type { ICategory } from '@/entities/category'

export const useCategoryFormInitialValues = (category: ICategory | undefined) => {
  return {
    name: category ? category.name : '',
    description: category ? category.description : '',
  }
}

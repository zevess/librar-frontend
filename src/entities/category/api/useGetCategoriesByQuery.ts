import { useMutation } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'

export const useGetCategoriesByQuery = () => {
  const {
    mutate: findCategory,
    data: categories,
    isPending: isCategoriesPending,
    isSuccess: isCategoriesSucces,
    isError: isCategoriesError,
  } = useMutation({
    mutationKey: ['get categories by query'],
    mutationFn: (query: string) => categoryService.getCategoriesByQuery(query),
  })
  return { findCategory, categories, isCategoriesError, isCategoriesPending, isCategoriesSucces }
}

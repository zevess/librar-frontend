import { useMutation, useQuery } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'

export const useGetCategoriesByQuery = () => {
  const {
    mutate: findCategory,
    data: categories,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['get categories by query'],
    mutationFn: (query: string) => categoryService.getCategoriesByQuery(query),
  })
  return { findCategory, categories, isPending, isSuccess }
}

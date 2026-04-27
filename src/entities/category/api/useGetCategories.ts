import { useQuery } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'

export const useGetCategories = () => {
  const {
    data: categories,
    isFetching: isCategoriesFetching,
    isFetched: isCategoriesFetched,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ['get categories'],
    queryFn: () => categoryService.getCategories(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  return {
    categories,
    isCategoriesError,
    isCategoriesFetched,
    isCategoriesFetching,
    isCategoriesPending,
  }
}

import { useQuery } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'

export const useGetCategory = (categoryId: string) => {
  const {
    data: category,
    isFetching: isCategoryFetching,
    isFetched: isCategoryFetched,
    isPending: isCategoryPending,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ['get category'],
    queryFn: () => categoryService.getCategory(categoryId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  return { category, isCategoryError, isCategoryFetched, isCategoryFetching, isCategoryPending }
}

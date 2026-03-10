import { useQuery } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'

export const useGetCategories = () => {
  const { data: categories } = useQuery({
    queryKey: ['get categories'],
    queryFn: () => categoryService.getCategories(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  return { categories }
}

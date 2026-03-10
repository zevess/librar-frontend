import { useQuery } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'

export const useGetCategory = (categoryId: string) => {
  const { data: category } = useQuery({
    queryKey: ['get category'],
    queryFn: () => categoryService.getCategory(categoryId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  return { category }
}

import { useQuery } from '@tanstack/vue-query'
import { type ComputedRef } from 'vue'
import type { ICategoriesParams } from '../model/category.types'
import { categoryService } from '../model/category.service'

export const useGetAdminCategories = (
  params?: ComputedRef<ICategoriesParams>,
  enabled?: boolean,
) => {
  const {
    data: categories,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get admin categories', params],
    queryFn: () => categoryService.getAdminCategories(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { categories, isFetching, isFetched, refetch }
}

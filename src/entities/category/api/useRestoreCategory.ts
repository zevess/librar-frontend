import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'
import { categoryService } from '../model/category.service'

export const useRestoreCategory = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: restoreCategory } = useMutation({
    mutationKey: ['restore category'],
    mutationFn: (categoryId: string) => categoryService.restoreCategory(categoryId),
    onSuccess() {
      toast.success('Успех', 'Категория успешно восстановлена')
      queryClient.invalidateQueries({
        queryKey: ['get admin categories'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { restoreCategory }
}

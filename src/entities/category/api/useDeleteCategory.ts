import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'
import { useToast } from 'primevue'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deleteCategory } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (categoryId: string) => categoryService.deleteCategory(categoryId),
    onSuccess(data) {
      toast.success('Статус', 'Категория успешно удалена')
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

  return { deleteCategory }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import type { ICategoryForm } from '../model/category.types'
import { categoryService } from '../model/category.service'
import { useToastStore } from '@/shared/lib'

export const useUpdateCategory = () => {
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: updateCategory, isPending: isCategoryUpdating } = useMutation({
    mutationKey: ['update category'],
    mutationFn: ({ data, categoryId }: { data: ICategoryForm; categoryId: string }) =>
      categoryService.updateCategory(data, categoryId),
    onSuccess() {
      toast.success('Успех', 'Категория успешно обновлена')
      queryClient.invalidateQueries({
        queryKey: ['get admin categories'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { updateCategory, isCategoryUpdating, errorMessage }
}

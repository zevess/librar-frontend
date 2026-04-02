import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import type { ICategoryForm } from '../model/category.types'
import { categoryService } from '../model/category.service'
import { useToastStore } from '@/shared/lib'

export const useUpdateCategory = () => {
  const router = useRouter()
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: updateCategory, isPending: isCategoryUpdating } = useMutation({
    mutationKey: ['update category'],
    mutationFn: ({ data, categoryId }: { data: ICategoryForm; categoryId: string }) =>
      categoryService.updateCategory(data, categoryId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get categories'],
      })
      toast.success('Статус', 'Категория успешно обновлена')

      // router.push(PUBLIC_URL.adminCategories())
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

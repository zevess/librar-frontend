import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'
import axios from 'axios'
import { ref } from 'vue'
import type { ICategoryForm } from '../model/category.types'
import { categoryService } from '../model/category.service'
import { useToast } from 'primevue'
import { useToastStore } from '@/shared/lib'

export const useCreateCategory = () => {
  const router = useRouter()
  const errorMessage = ref()
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: createCategory, isPending: isCategoryCreating } = useMutation({
    mutationKey: ['create category'],
    mutationFn: (data: ICategoryForm) => categoryService.createCategory(data),
    onSuccess() {
      toast.success('Статус', 'Категория успешно создана')
      queryClient.invalidateQueries({
        queryKey: ['get categories'],
      })
      router.push(PUBLIC_URL.adminCategories())
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        errorMessage.value = error.response?.data.message
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { createCategory, isCategoryCreating, errorMessage }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'
import { useToast } from 'primevue'
import { useToastStore } from '@/shared/lib'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deleteCategory } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (categoryId: string) => categoryService.deleteCategory(categoryId),
    onSuccess(data) {
      toast.success('Статус', 'Категория успешно создана')
      queryClient.invalidateQueries({
        queryKey: ['get categories'],
      })
    },
  })

  return { deleteCategory }
}

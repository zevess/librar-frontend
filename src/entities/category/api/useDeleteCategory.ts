import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { categoryService } from '../model/category.service'
import { useToast } from 'primevue'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutate: deleteCategory } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (categoryId: string) => categoryService.deleteCategory(categoryId),
    onSuccess(data) {
      toast.add({
        severity: 'success',
        summary: 'Статус',
        detail: data.data.message,
        life: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: ['get categories'],
      })
    },
  })

  return { deleteCategory }
}

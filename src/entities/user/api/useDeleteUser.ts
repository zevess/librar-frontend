import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { userService } from '../model/user.service'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: deleteUser } = useMutation({
    mutationKey: ['delete user'],
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess() {
      toast.success('Успех', 'Пользователь успешно удален')
      queryClient.invalidateQueries({
        queryKey: ['get users'],
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { deleteUser }
}

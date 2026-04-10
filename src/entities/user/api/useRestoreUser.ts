import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { userService } from '../model/user.service'
import { useToastStore } from '@/shared/lib'
import axios from 'axios'

export const useRestoreUser = () => {
  const queryClient = useQueryClient()
  const toast = useToastStore()
  const { mutate: restoreUser } = useMutation({
    mutationKey: ['restore user'],
    mutationFn: (userId: string) => userService.restoreUser(userId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get users'],
      })
      toast.success('Успех', 'Пользователь успешно восстановлен')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { restoreUser }
}

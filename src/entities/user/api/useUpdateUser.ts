import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { userService } from '../model/user.service'
import type { IUserForm } from '../model/user.types'
import axios from 'axios'
import { useToastStore } from '@/shared/lib'

export const useUpdateUser = () => {
  const toast = useToastStore()
  const queryClient = useQueryClient()
  const {
    mutate: updateUser,
    data,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['update user'],
    mutationFn: ({ data, userId }: { data: IUserForm; userId: string }) =>
      userService.updateUser(data, userId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get users'],
      })
      toast.success('Успех', 'Пользователь успешно изменён')
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message)
        toast.error('Ошибка', error.response?.data.message)
      }
    },
  })
  return { updateUser, data, isPending, isSuccess }
}

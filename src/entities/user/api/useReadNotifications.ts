import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { userService } from '../model/user.service'

export const useReadNotifications = () => {
  const queryClient = useQueryClient()
  const { mutate: readNotifications, data: notifications } = useMutation({
    mutationKey: ['read notifications'],
    mutationFn: () => userService.readNotifications(),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get profile'],
      })
    },
  })

  return { readNotifications, notifications }
}

import { useMutation } from '@tanstack/vue-query'
import { userService } from '../model/user.service'
import { useUserStore } from '../model/user.store'

export const useLogout = () => {
  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      useUserStore().clear()
    },
  })

  return { logout }
}

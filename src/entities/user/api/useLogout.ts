import { useMutation } from '@tanstack/vue-query'
import { userService } from '../model/user.service'
import { useUserStore } from '../model/user.store'
import { useRouter } from 'vue-router'

export const useLogout = () => {
  const router = useRouter()
  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      useUserStore().clear()
      router.go(0)
    },
  })

  return { logout }
}

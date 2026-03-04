import { authService } from '@/entities/auth/model/auth.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { userService } from '../model/user.service'
import { useUserStore } from '../model/user.store'
import { useRouter } from 'vue-router'
import { PUBLIC_URL } from '@/shared/config'

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

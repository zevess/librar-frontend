import { useUserStore } from '@/stores/counter'
import { useQuery } from '@tanstack/vue-query'
import { userService } from '../model/user.service'

export const useProfile = () => {
  // const { setUser } = useUserStore()
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.me(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  return { profile }
}

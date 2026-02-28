import { useUserStore } from '@/stores/counter'
import { useQuery } from '@tanstack/vue-query'
import { userService } from '../model/user.service'

// export const useProfile = () =>
//   useQuery({
//     queryKey: ['profile'],
//     queryFn: userService.me,
//     select: (data) => data.user,
//     staleTime: 1000 * 60 * 5,
//   })
export const useProfile = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.me(),
    // queryFn: async () => {
    //   try {
    //     const data = await userService.me()
    //     console.log(data.user)
    //     return data
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    // select: (data) => data.user,
  })
  return { profile }
}

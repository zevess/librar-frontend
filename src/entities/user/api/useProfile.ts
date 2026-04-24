import { useQuery } from '@tanstack/vue-query'
import { userService } from '../model/user.service'

export const useProfile = () => {
  const {
    data: profile,
    isFetching,
    isError,
    error,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ['get profile'],
    queryFn: () => userService.me(),
    refetchOnWindowFocus: false,
  })

  return { profile, isFetched, isFetching, isSuccess, isError, error }
}

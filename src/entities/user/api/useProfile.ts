import { useQuery } from '@tanstack/vue-query'
import { userService } from '../model/user.service'

export const useProfile = () => {
  const {
    data: profile,
    isFetching: isProfileFetching,
    isError: isProfileError,
    isFetched: isProfileFetched,
    isSuccess: isProfileSuccess,
    isPending: isProfilePending,
  } = useQuery({
    queryKey: ['get profile'],
    queryFn: () => userService.me(),
    refetchOnWindowFocus: false,
  })

  return {
    profile,
    isProfileSuccess,
    isProfilePending,
    isProfileFetching,
    isProfileFetched,
    isProfileError,
  }
}

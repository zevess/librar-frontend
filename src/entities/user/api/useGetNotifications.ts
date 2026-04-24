import { useQuery } from '@tanstack/vue-query'
import { userService } from '../model/user.service'

export const useGetNotifications = () => {
  const {
    data: notifications,
    isFetching,
    isError,
    error,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ['get notifications'],
    queryFn: () => userService.getNotifications(),
    refetchOnWindowFocus: false,
  })

  return { notifications, isFetched, isFetching, isSuccess, isError, error }
}

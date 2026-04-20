import { useQuery } from '@tanstack/vue-query'
import type { IUserParams } from '../model/user.types'
import { userService } from '../model/user.service'
import type { ComputedRef } from 'vue'

export const useGetUsers = (params?: ComputedRef<IUserParams>, enabled?: boolean) => {
  const {
    data: users,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['get users', params],
    queryFn: () => userService.getUsers(params?.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  })
  return { users, isFetching, isFetched, refetch }
}

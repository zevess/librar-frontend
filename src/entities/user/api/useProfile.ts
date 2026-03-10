import { useQuery } from '@tanstack/vue-query'
import { userService } from '../model/user.service'
import { useUserStore } from '../model/user.store'
import axios from 'axios'
import { effectScope, watch } from 'vue'

// const scope = effectScope()

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

  return { profile, isFetched, isFetching, isSuccess }
}

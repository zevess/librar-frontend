import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'
import { subscriptionService } from '../model/subscription.service'

export const useGetUserSubscriptions = (userId: ComputedRef<number | undefined>) => {
  const {
    data: subscriptions,
    isFetching: isSubscriptionsFetching,
    isFetched: isSubscriptionsFetched,
  } = useQuery({
    queryKey: ['get user subscriptions', userId],
    queryFn: () => subscriptionService.getUserSubscriptions(String(userId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: () => !!userId.value,
  })
  return { subscriptions, isSubscriptionsFetched, isSubscriptionsFetching }
}

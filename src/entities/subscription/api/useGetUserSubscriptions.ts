import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'
import { subscriptionService } from '../model/subscription.service'

export const useGetUserSubscriptions = (userId: ComputedRef<number | undefined>) => {
  const {
    data: subscriptions,
    isFetching: isSubscriptionsFetching,
    isFetched: isSubscriptionsFetched,
    error: subscriptionsError,
    isError: isSubscriptionsError,
    isPending: isSubscriptionsPending,
  } = useQuery({
    queryKey: ['get user subscriptions', userId],
    queryFn: () => subscriptionService.getUserSubscriptions(String(userId.value)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: () => !!userId.value,
    retry: false,
  })
  return {
    subscriptions,
    isSubscriptionsFetched,
    isSubscriptionsFetching,
    subscriptionsError,
    isSubscriptionsError,
    isSubscriptionsPending,
  }
}

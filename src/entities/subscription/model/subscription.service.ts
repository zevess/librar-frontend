import { apiPrivate, type IResponse } from '@/shared/api'
import { API_URL } from '@/shared/config'
import type { IBook } from '@/entities/book'

class SubscriptionService {
  async getUserSubscriptions(userId: string) {
    const { data } = await apiPrivate<IResponse<IBook[]>>({
      url: API_URL.getUserSubscriptions(userId),
      method: 'GET',
    })
    return data
  }

  async subscribeBook(bookId: string) {
    const response = await apiPrivate({
      url: API_URL.subscribe(bookId),
      method: 'POST',
      data: {
        bookId,
      },
    })
    return response
  }
  async unsubscribeBook(bookId: string) {
    const response = await apiPrivate({
      url: API_URL.unsubscribe(bookId),
      method: 'DELETE',
      data: {
        bookId,
      },
    })
    return response
  }
}

export const subscriptionService = new SubscriptionService()

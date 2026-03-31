import { apiPrivate } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import type { IUser, IUserNotifications, IUserResponse } from './user.types'
import { removeAccessToken } from '@/entities/auth'
import type { IResponse } from '@/shared/api'

class UserService {
  async me() {
    const { data } = await apiPrivate<IResponse<IUser>>({
      url: API_URL.me(),
      method: 'GET',
    })
    return data
  }

  async logout() {
    const response = await apiPrivate({
      url: API_URL.logout(),
      method: 'POST',
    })
    removeAccessToken()
    return response
  }

  async getNotifications() {
    const { data } = await apiPrivate<IResponse<IUserNotifications[]>>({
      url: API_URL.notifications(),
      method: 'GET',
    })
    return data
  }

  async readNotifications() {
    const response = await apiPrivate({
      url: API_URL.readNotifications(),
      method: 'PUT',
    })
    return response
  }
}

export const userService = new UserService()

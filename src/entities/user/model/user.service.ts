import { apiPrivate } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import type { IUser, IUserResponse } from './user.types'
import { removeAccessToken } from '@/entities/auth'

class UserService {
  async me() {
    const { data } = await apiPrivate<IUserResponse>({
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
}

export const userService = new UserService()

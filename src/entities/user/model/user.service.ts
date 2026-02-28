import { apiPrivate } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import type { IUser } from './user.types'

class UserService {
  async me() {
    const { data } = await apiPrivate<IUser>({
      url: API_URL.me(),
      method: 'GET',
    })
    return data
  }
}

export const userService = new UserService()

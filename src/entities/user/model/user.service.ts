import { apiPrivate } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import type { IUser, IUserForm, IUserNotifications, IUserParams } from './user.types'
import { removeAccessToken } from '@/entities/auth'
import type { IPaginatedResponse, IResponse } from '@/shared/api'

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

  async getUsers(params?: IUserParams) {
    const { data } = await apiPrivate<IPaginatedResponse<IUser>>({
      url: API_URL.users(),
      method: 'GET',
      params,
    })
    return data
  }
  async updateUser(data: IUserForm, userId: string) {
    const response = await apiPrivate<IResponse<IUser>>({
      url: API_URL.updateUser(userId),
      method: 'PUT',
      data,
    })
    return response
  }

  async deleteUser(userId: string) {
    const response = await apiPrivate({
      url: API_URL.deleteUser(userId),
      method: 'DELETE',
      data: {
        userId,
      },
    })
    return response
  }

  async restoreUser(userId: string) {
    const response = await apiPrivate({
      url: API_URL.restoreUser(userId),
      method: 'POST',
      data: {
        userId,
      },
    })
    return response
  }
}

export const userService = new UserService()

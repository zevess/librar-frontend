import { api } from '@/shared/api/api.interceptor'
import { type IAuthResponse, type ILogin } from './auth.types'
import { API_URL } from '@/shared/config/api.config'
import { saveTokenToStorage } from './auth.token'

class AuthService {
  async login(data: ILogin) {
    const response = await api<IAuthResponse>({
      url: API_URL.login(),
      method: 'POST',
      data,
    })
    if (response.data.token) {
      saveTokenToStorage(response.data.token)
    }
    return response
  }
}
export const authService = new AuthService()

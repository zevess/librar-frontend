import { api } from '@/shared/api/api.interceptor'
import type {
  IResetLinkSentResponse,
  IAuthResponse,
  ILogin,
  IRegister,
  IResetPassword,
} from './auth.types'
import { API_URL } from '@/shared/config/api.config'
import { saveAccessToken } from './auth.token'

class AuthService {
  async login(data: ILogin) {
    const response = await api<IAuthResponse>({
      url: API_URL.login(),
      method: 'POST',
      data,
    })
    if (response.data.token) {
      saveAccessToken(response.data.token)
    }
    return response
  }

  async register(data: IRegister) {
    const response = await api<IAuthResponse>({
      url: API_URL.register(),
      method: 'POST',
      data,
    })
    if (response.data.token) {
      saveAccessToken(response.data.token)
    }
    return response
  }

  async forgotPassword(email: string) {
    const response = await api<IResetLinkSentResponse>({
      url: API_URL.forgotPassword(),
      method: 'POST',
      data: {
        email: email,
      },
    })
    return response
  }

  async resetPassword(data: IResetPassword) {
    const response = await api({
      url: API_URL.resetPassword(),
      method: 'POST',
      data,
    })
    return response
  }
}
export const authService = new AuthService()

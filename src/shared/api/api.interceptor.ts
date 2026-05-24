import type { CreateAxiosDefaults } from 'axios'
import { errorCatch, getContentType } from './api.helper'
import axios from 'axios'
import { PUBLIC_URL, SERVER_URL } from '../config'
import {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
  saveRefreshToken,
} from '@/entities/auth'
import { authService } from '@/entities/auth/model/auth.service'

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  // withCredentials: true
}

const api = axios.create(options)
const apiPrivate = axios.create(options)

apiPrivate.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiPrivate.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await authService.refresh()
        if (response.data.access_token) {
          saveAccessToken(response.data.access_token)
          saveRefreshToken(response.data.refresh_token)
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
        }
        return apiPrivate.request(originalRequest)
      } catch (error) {
        removeAccessToken()
      }
    }
    return Promise.reject(error)
  },
)

// apiPrivate.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       removeAccessToken()
//     }
//     return Promise.reject(error)
//   },
// )

export { api, apiPrivate }

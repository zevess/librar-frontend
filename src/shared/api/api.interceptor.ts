import type { AxiosError, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import { errorCatch, getContentType } from './api.helper'
import axios from 'axios'
import { PUBLIC_URL, SERVER_URL } from '../config'
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from '@/entities/auth'
import { authService } from '@/entities/auth/model/auth.service'

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
}

const api = axios.create(options)
const apiPrivate = axios.create(options)

apiPrivate.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

let isRefetching = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiPrivate.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _isRetry?: boolean }
    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
      if (isRefetching) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiPrivate.request(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }
      originalRequest._isRetry = true
      isRefetching = true
      return new Promise((resolve, reject) => {
        authService
          .refresh()
          .then((response) => {
            if (response.data.access_token) {
              saveAccessToken(response.data.access_token)
              saveRefreshToken(response.data.refresh_token)

              processQueue(null, response.data.access_token)
              originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
              resolve(apiPrivate.request(originalRequest))
            } else {
              processQueue(new Error('No access token'), null)
              reject(new Error('No access token'))
            }
          })
          .catch((refreshError) => {
            processQueue(refreshError, null)
            removeAccessToken()
            removeRefreshToken()
            reject(refreshError)
          })
          .finally(() => {
            isRefetching = false
          })
      })
    }
    return Promise.reject(error)
  },
)

// apiPrivate.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config

//     if (error?.response?.status === 401 && error.config && !originalRequest._isRetry) {
//       originalRequest._isRetry = true
//       try {
//         const response = await authService.refresh()
//         if (response.data.access_token) {
//           saveAccessToken(response.data.access_token)
//           saveRefreshToken(response.data.refresh_token)
//           originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
//         }
//         return apiPrivate.request(originalRequest)
//       } catch (error) {
//         removeAccessToken()
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export { api, apiPrivate }

import type { CreateAxiosDefaults } from 'axios'
import { SERVER_URL } from '../config/api.config'
import { errorCatch, getContentType } from './api.helper'
import axios from 'axios'
import { getAccessToken } from '@/entities/auth/model/auth.token'

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  withCredentials: true,
}

const api = axios.create(options)
const apiPrivate = axios.create(options)

apiPrivate.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

// apiPrivate.interceptors.request.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config
//     if (
//       error?.response?.status === 401 ||
//       errorCatch(error) === 'jwt expired' ||
//       (errorCatch(error) === 'jwt must be provided' && error.config && !error.config._isRetry)
//     ) {
//       originalRequest._isRetry = true
//       try {
//         await authService.refresh()
//         return apiWithAuth.request(originalRequest)
//       } catch (error) {
//         if (errorCatch(error) === 'jwt expired') removeFromStorage()
//       }
//     }
//   },
// )

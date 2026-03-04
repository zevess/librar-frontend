import type { CreateAxiosDefaults } from 'axios'
import { errorCatch, getContentType } from './api.helper'
import axios from 'axios'

import { PUBLIC_URL, SERVER_URL } from '../config'
import { useUserStore } from '@/entities/user'
import { useRouter } from 'vue-router'
import { getAccessToken, removeAccessToken } from '@/entities/auth'

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
}

// const router = useRouter()
// const store = useUserStore()

const api = axios.create(options)
const apiPrivate = axios.create(options)

apiPrivate.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeAccessToken()
    }
  },
)

export { api, apiPrivate }

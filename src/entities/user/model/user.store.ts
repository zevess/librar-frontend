import { defineStore } from 'pinia'
import type { IUser, UserState } from './user.types'
import { getAccessToken, removeAccessToken } from '@/entities/auth'
import { userService } from './user.service'

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: null,
      token: null,
      isAuthentificated: false,
      isInitialized: false,
    }
  },
  actions: {
    setUser(user: IUser) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    setAuthentificatedStatus(status: boolean) {
      this.isAuthentificated = status
    },
    clear() {
      removeAccessToken()
      this.$patch({
        token: null,
        user: null,
        isAuthentificated: false,
      })
    },
    initFromCookies() {
      const token = getAccessToken()
      if (token) {
        this.isAuthentificated = true
        this.token = token
      } else {
        this.clear()
      }
    },
    async initialize() {
      this.initFromCookies()
      if (this.token) {
        try {
          const profile = await userService.me()
          this.user = profile.data
        } catch (error) {
          this.clear()
        }
      }
      this.isInitialized = true
    },
  },
})

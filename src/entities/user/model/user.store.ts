import { defineStore } from 'pinia'
import type { IUser, UserState } from './user.types'
import { getAccessToken, removeTokenFromStorage } from '@/entities/auth'

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: null,
      token: null,
      isAuthentificated: false,
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
      removeTokenFromStorage()
      this.$patch({
        token: null,
        user: null,
        isAuthentificated: false,
      })
    },
    initFromCookies() {
      const token = getAccessToken()
      if (token) {
        this.token = token
        this.isAuthentificated = true
      } else {
        this.clear()
      }
    },
  },
})

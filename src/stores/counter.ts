// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'
// import { type IUser } from '@/entities/user'

import type { IAuthResponse } from '@/entities/auth'
import { getAccessToken } from '@/entities/auth/model/auth.token'
import { useProfile, type IUser } from '@/entities/user'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   const user = ref<IUser>()
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

interface UserState {
  user: IUser | null
  token: string | null
  isAuthentificated: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: null,
      token: null,
      isAuthentificated: false,
    }
  },
  // getters: {
  //   isAuthentificated: (state) => !!state.user?.user,
  // },
  actions: {
    setUser(user: IUser) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    initFromCookies() {
      const token = getAccessToken()
      if (token) {
        this.token = token
        this.isAuthentificated = true
      }
    },
  },
})

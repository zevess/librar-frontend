// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'
// import { type IUser } from '@/entities/user'

import type { IAuthResponse } from '@/entities/auth'
import type { IUser } from '@/entities/user'
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
  user: IAuthResponse | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: null,
    }
  },
  actions: {
    setUser(user: IAuthResponse) {
      this.user = user
    },
  },
})

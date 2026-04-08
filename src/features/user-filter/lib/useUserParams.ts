import type { IUserParams } from '@/entities/user/model/user.types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useUserParams = () => {
  const route = useRoute()
  const userParams = ref<IUserParams>({
    id: route.query.id ? String(route.query.id) : '',
    q: route.query.q ? String(route.query.q) : '',
    email: route.query.email ? String(route.query.email) : '',
    role: route.query.role ? String(route.query.role) : '',
    page: route.query.page ? Number(route.query.page) : 1,
  })
  return { userParams }
}

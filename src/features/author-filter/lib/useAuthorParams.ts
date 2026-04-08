import type { IAuthorParams } from '@/entities/author'
import type { IPublisherParams } from '@/entities/publisher'
import type { IReservationParams } from '@/entities/reservation'
import type { IUserParams } from '@/entities/user/model/user.types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useAuthorParams = () => {
  const route = useRoute()
  const authorParams = ref<IAuthorParams>({
    page: route.query.page ? Number(route.query.page) : 1,
    id: route.query.id ? String(route.query.id) : '',
    q: route.query.q ? String(route.query.q) : '',
  })
  return { authorParams }
}

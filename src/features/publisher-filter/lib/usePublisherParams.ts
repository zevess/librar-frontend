import type { IPublisherParams } from '@/entities/publisher'
import type { IReservationParams } from '@/entities/reservation'
import type { IUserParams } from '@/entities/user/model/user.types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const usePublisherParams = () => {
  const route = useRoute()
  const publisherParams = ref<IPublisherParams>({
    page: route.query.page ? Number(route.query.page) : 1,
    id: route.query.id ? String(route.query.id) : '',
    q: route.query.q ? String(route.query.q) : '',
  })
  return { publisherParams }
}

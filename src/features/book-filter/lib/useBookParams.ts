import type { IAuthorParams } from '@/entities/author'
import type { IBooksParams } from '@/entities/book'
import type { IPublisherParams } from '@/entities/publisher'
import type { IReservationParams } from '@/entities/reservation'
import type { IUserParams } from '@/entities/user/model/user.types'
import { convertArrayQuery } from '@/shared/lib'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useBookParams = () => {
  const route = useRoute()
  const bookParams = ref<IBooksParams>({
    page: route.query.page ? Number(route.query.page) : 1,
    id: route.query.id ? String(route.query.id) : '',
    q: route.query.q ? String(route.query.q) : '',
    category: route.query.category ? Number(route.query.category) : null,
    genres: route.query.genres ? convertArrayQuery(route.query.genres) : [],
    publishers: route.query.publishers ? convertArrayQuery(route.query.publishers) : [],
  })
  return { bookParams }
}

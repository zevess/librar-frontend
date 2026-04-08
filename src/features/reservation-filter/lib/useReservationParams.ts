import type { IReservationParams } from '@/entities/reservation'
import type { IUserParams } from '@/entities/user/model/user.types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useReservationParams = () => {
  const route = useRoute()
  const reservationParams = ref<IReservationParams>({
    page: route.query.page ? Number(route.query.page) : 1,
    id: route.query.id ? String(route.query.id) : '',
    email: route.query.email ? String(route.query.email) : '',
    bookId: route.query.bookId ? String(route.query.bookId) : '',
    status: route.query.status ? String(route.query.status) : '',
  })
  return { reservationParams }
}

import { convertArrayQuery } from '@/shared/lib'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export interface IFilter {
  page: number
  id?: string
  q?: string

  bookId?: string
  status?: string
  email?: string

  category?: number | null
  genres?: number[]
  publishers?: number[]

  role?: string
}

export const useFilter = () => {
  const route = useRoute()
  const filter = ref<IFilter>({
    page: route.query.page ? Number(route.query.page) : 1,
    id: route.query.id ? String(route.query.id) : '',
    q: route.query.q ? String(route.query.q) : '',

    bookId: route.query.bookId ? String(route.query.bookId) : '',
    status: route.query.status ? String(route.query.status) : '',
    email: route.query.email ? String(route.query.email) : '',

    category: route.query.category ? Number(route.query.category) : null,
    genres: route.query.genres ? convertArrayQuery(route.query.genres) : [],
    publishers: route.query.publishers ? convertArrayQuery(route.query.publishers) : [],

    role: route.query.role ? String(route.query.role) : '',
  })
  return { filter }
}

export const filterInitialData: IFilter = {
  page: 1,
  id: '',
  q: '',

  bookId: '',
  status: '',
  email: '',

  category: null,
  genres: [],
  publishers: [],

  role: '',
}

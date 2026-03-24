import { convertArrayQuery } from '@/shared/lib'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export interface IFilter {
  page: number
  q?: string | null
  id?: string | null
  bookId?: string | null
  category?: number | null
  genres?: number[]
  publishers?: number[]
  user?: string | null
  status?: string | null
}

export const useFilter = () => {
  const route = useRoute()
  const filter = ref<IFilter>({
    page: route.query.page ? Number(route.query.page) : 1,
    q: route.query.q ? String(route.query.q) : '',
    id: route.query.id ? String(route.query.id) : '',
    bookId: route.query.bookId ? String(route.query.bookId) : '',
    category: route.query.category ? Number(route.query.category) : null,
    genres: route.query.genres ? convertArrayQuery(route.query.genres) : [],
    publishers: route.query.publishers ? convertArrayQuery(route.query.publishers) : [],
    user: route.query.user ? String(route.query.user) : '',
    status: route.query.status ? String(route.query.status) : '',
  })
  return { filter }
}

export const filterInitialData = {
  page: 1,
  q: '',
  id: '',
  bookId: '',
  category: null,
  genres: [],
  publishers: [],
  user: '',
  status: '',
}

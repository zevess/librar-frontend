import { convertArrayQuery } from '@/shared/lib'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useParams = () => {
  const route = useRoute()

  const params = ref({
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
  return { params }
}

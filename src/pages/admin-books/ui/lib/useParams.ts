import { convertArrayQuery } from '@/shared/lib'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useParams = () => {
  const route = useRoute()

  const params = ref({
    q: route.query.q ? String(route.query.q) : '',
    bookId: route.query.bookId ? String(route.query.bookId) : '',
    page: route.query.page ? Number(route.query.page) : 1,
    category: route.query.category ? Number(route.query.category) : null,
    genres: convertArrayQuery(route.query.genres) ?? [],
    publishers: convertArrayQuery(route.query.publishers) ?? [],
  })
  return { params }
}

import { convertArrayQuery } from '@/shared/lib'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useCatalogFilter = () => {
  const route = useRoute()

  const filters = ref({
    q: route.query.q ? String(route.query.q) : '',
    page: route.query.page ? Number(route.query.page) : 1,
    category: route.query.category ? Number(route.query.category) : null,
    genres: route.query.genres ? convertArrayQuery(route.query.genres) : [],
    publishers: route.query.publishers ? convertArrayQuery(route.query.publishers) : [],
  })
  return { filters }
}

import { convertArrayQuery } from '@/shared/lib'
import { ref } from 'vue'
import { useRoute, type LocationQuery } from 'vue-router'

export const useCatalogFilter = (query: LocationQuery) => {
  // const route = useRoute()
  const filter = ref({
    q: query.q ? String(query.q) : '',
    page: query.page ? Number(query.page) : 1,
    category: query.category ? Number(query.category) : null,
    genres: query.genres ? convertArrayQuery(query.genres) : [],
    publishers: query.publishers ? convertArrayQuery(query.publishers) : [],
    status: query.status ? String(query.status) : '',
  })
  return { filter }
}

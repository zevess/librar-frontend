import { cleanQuery, convertArrayQuery } from '@/shared/lib'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterInitialData, type IFilter } from '../model/filter.types'

export const useFilter = () => {
  const route = useRoute()
  const router = useRouter()

  const applyFilter = (resetPage = false) => {
    const cleanedQuery = cleanQuery(params.value)
    const newQuery = {
      ...cleanedQuery.value,
    }

    if (resetPage) newQuery.page = 1
    router.push({ query: newQuery })
  }

  const clearFilter = () => {
    router.replace({
      query: {
        page: 1,
      },
    })
    Object.assign(params, filterInitialData)
  }

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value: number) => {
      params.value.page = value
    },
  })

  const id = computed({
    get: () => (route.query.id ? String(route.query.id) : null),
    set: (value: string) => {
      params.value.id = value
    },
  })

  const q = computed({
    get: () => (route.query.q ? String(route.query.q) : null),
    set: (value: string) => {
      params.value.q = value
    },
  })

  const bookId = computed({
    get: () => (route.query.bookId ? String(route.query.bookId) : null),
    set: (value: string) => {
      params.value.bookId = value
    },
  })

  const status = computed({
    get: () => (route.query.status ? String(route.query.status) : null),
    set: (value: string) => {
      params.value.status = value
    },
  })

  const email = computed({
    get: () => (route.query.email ? String(route.query.email) : null),
    set: (value: string) => {
      params.value.email = value
    },
  })

  const category = computed({
    get: () => (route.query.category ? Number(route.query.category) : null),
    set: (value: number) => {
      params.value.category = value
    },
  })

  const genres = computed({
    get: () => (route.query.genres ? convertArrayQuery(route.query.genres) : []),
    set: (values: number[]) => {
      params.value.genres = values
    },
  })

  const publishers = computed({
    get: () => (route.query.publishers ? convertArrayQuery(route.query.publishers) : []),
    set: (values: number[]) => {
      params.value.publishers = values
    },
  })

  const role = computed({
    get: () => (route.query.role ? String(route.query.role) : null),
    set: (value: string) => {
      params.value.role = value
    },
  })

  const params = computed<IFilter>(() => ({
    id: id.value,
    q: q.value,
    bookId: bookId.value,
    category: category.value,
    genres: genres.value,
    publishers: publishers.value,
    status: status.value,
    email: email.value,
    role: role.value,
    page: page.value,
  }))

  return {
    id,
    bookId,
    q,
    category,
    genres,
    publishers,
    status,
    email,
    role,
    page,
    params,
    applyFilter,
    clearFilter,
  }
}

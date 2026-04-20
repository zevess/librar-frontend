import type { IBooksParams } from '@/entities/book'
import { filterInitialData } from '@/features/filter'
import { convertArrayQuery } from '@/shared/lib'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, type LocationQuery } from 'vue-router'

export const useCatalogFilter = () => {
  const route = useRoute()
  const router = useRouter()

  const updateQuery = (query: IBooksParams, resetPage = false) => {
    const newQuery = {
      ...route.query,
      ...query,
    }

    if (resetPage) newQuery.page = 1

    router.push({ query: newQuery })
  }

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (value: number) => {
      updateQuery({ page: value })
    },
  })

  const q = computed({
    get: () => (route.query.q ? String(route.query.q) : null),
    set: (value: string) => {
      updateQuery({ q: value }, true)
    },
  })

  const category = computed({
    get: () => (route.query.category ? Number(route.query.category) : null),
    set: (value: number) => {
      updateQuery({ category: value }, true)
    },
  })

  const genres = computed({
    get: () => (route.query.genres ? convertArrayQuery(route.query.genres) : []),
    set: (values: number[]) => {
      updateQuery({ genres: values }, true)
    },
  })

  const publishers = computed({
    get: () => (route.query.publishers ? convertArrayQuery(route.query.publishers) : []),
    set: (values: number[]) => {
      updateQuery({ publishers: values }, true)
    },
  })

  const status = computed({
    get: () => (route.query.status ? String(route.query.status) : null),
    set: (value: string) => {
      updateQuery({ status: value }, true)
    },
  })

  const params = computed<IBooksParams>(() => ({
    q: q.value,
    category: category.value,
    genres: genres.value,
    publishers: publishers.value,
    status: status.value,
    page: page.value,
  }))

  return {
    q,
    category,
    genres,
    publishers,
    status,
    page,
    params,
  }
}

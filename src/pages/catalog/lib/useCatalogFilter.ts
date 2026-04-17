import type { IBooksParams } from '@/entities/book'
import { filterInitialData } from '@/features/filter'
import { convertArrayQuery } from '@/shared/lib'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, type LocationQuery } from 'vue-router'

// export const useCatalogFilter = () => {
//   const route = useRoute()
//   const router = useRouter()
//   const filter = ref({
//     q: route.query.q ? String(route.query.q) : '',
//     category: route.query.category ? Number(route.query.category) : null,
//     genres: route.query.genres ? convertArrayQuery(route.query.genres) : [],
//     publishers: route.query.publishers ? convertArrayQuery(route.query.publishers) : [],
//     status: route.query.status ? String(route.query.status) : '',
//   })

//   const page = ref(route.query.page ? Number(route.query.page) : 1)

//   watch(
//     () => route.query,
//     () => {
//       page.value = Number(route.query.page)
//     },
//   )

//   watch(
//     filter,
//     () =>
//       router.push({
//         query: { ...filter.value, page: 1 },
//       }),
//     { deep: true },
//   )

//   const params = computed(() => ({
//     ...filter.value,
//     page: page.value,
//   }))
//   return { filter, page, params }
// }
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
    get: () => (route.query.q ? String(route.query.q) : ''),
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
    get: () => (route.query.status ? String(route.query.status) : ''),
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

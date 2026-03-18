import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFilter } from './useFilter'

export const applyFilter = () => {
  const router = useRouter()
  const { filter } = useFilter()

  const newFilters = { ...filter.value }
  newFilters.page = 1
  router.push({ query: newFilters })
}

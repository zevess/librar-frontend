import { computed } from 'vue'
import { useRouter } from 'vue-router'

export function usePreviousRoute() {
  const router = useRouter()
  const previousRoute = computed(() => {
    const backUrl = router.options.history.state.back
    return backUrl ? router.resolve({ path: `${backUrl}` }) : null
  })

  return { previousRoute }
}

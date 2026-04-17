import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useGetParams = () => {
  const route = useRoute()
  const slug = computed(() => route.params.slug)
  const id = computed(() => String(slug.value).split('-')[String(slug.value).split('-').length - 1])
  return { slug, id }
}

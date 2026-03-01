import { useRoute } from 'vue-router'

export const useGetParams = () => {
  const route = useRoute()
  const slug = String(route.params.slug)
  return { slug }
}

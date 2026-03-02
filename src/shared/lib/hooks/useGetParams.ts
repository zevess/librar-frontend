import { useRoute } from 'vue-router'

export const useGetParams = () => {
  const route = useRoute()
  const slug = String(route.params.slug)
  const id = String(slug.split('-')[slug.split('-').length - 1])
  return { slug, id }
}

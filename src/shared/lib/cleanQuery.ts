import { computed } from 'vue'

export const cleanQuery = (query: object) => {
  return computed(() =>
    Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) =>
          value !== null &&
          value !== undefined &&
          value !== '' &&
          !(Array.isArray(value) && value.length === 0),
      ),
    ),
  )
}

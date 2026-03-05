import type { LocationQuery } from 'vue-router'

export const getArrayKey = (query: LocationQuery, key: string): number[] => {
  const value = query[key]
  if (!value) return []
  if (Array.isArray(value)) return value.map(Number)
  return [Number(value)]
}

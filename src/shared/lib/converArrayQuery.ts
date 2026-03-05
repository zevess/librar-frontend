import type { LocationQueryValue } from 'vue-router'

// export const convertArrayQuery = (
//   value: string[] | LocationQueryValue[] | undefined | LocationQueryValue,
// ) => {
//   if (!value) return []
//   const arr = Array.isArray(value) ? value : [value]
//   return arr.map((id) => Number(id)).filter((id) => !isNaN(id))
// }
export const convertArrayQuery = (param: unknown): number[] => {
  if (!param) return []
  if (Array.isArray(param)) {
    return param.map((value) => Number(value))
  }
  return [Number(param)]
  //   const arr = Array.isArray(value) ? value : [value]
  //   return arr.map((id) => Number(id)).filter((id) => !isNaN(id))
}

export const convertArrayQuery = (param: unknown): number[] => {
  if (!param) return []
  if (Array.isArray(param)) {
    return param.map((value) => Number(value))
  }
  return [Number(param)]
}

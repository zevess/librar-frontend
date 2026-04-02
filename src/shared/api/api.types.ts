export interface IPaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface IPaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: IPaginationMetaLinks[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface IPaginationMetaLinks {
  url: string | null
  label: string
  page: number
  active: boolean
}

export interface IPaginatedResponse<T> {
  data: T[]
  links: IPaginationLinks
  meta: IPaginationMeta
}

export interface IResponse<T> {
  data: T
  success: boolean
  message: string
}

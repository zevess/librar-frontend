import type { IBook } from '@/entities/book'

export interface IPublisher {
  id: number
  name: string
  slug: string
  description?: string
  isDeleted: boolean
  books: IBook[]
}

export interface IPublisherForm {
  name: string
  description?: string
}

export interface IPublisherParams {
  q?: string | null
  id?: string | null
  page?: number
}

import { type IBook } from '@/entities/book/model/book.types'

export interface IAuthor {
  id: number
  name: string
  slug: string
  description?: string
  isDeleted: boolean
  books: IBook[]
}

export interface IAuthorForm {
  name: string
  description?: string
}

export interface IAuthorParams {
  id?: string | null
  q?: string | null
  page: number
}

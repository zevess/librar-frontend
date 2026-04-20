import type { IAuthor } from '@/entities/author'
import type { ICategory } from '@/entities/category'
import type { IGenre } from '@/entities/genre'
import type { IPublisher } from '@/entities/publisher'

export interface IBook {
  id: number
  title: string
  slug: string
  description: string
  image: string
  author?: IAuthor
  publisher: IPublisher
  category: ICategory
  genres: {
    data: IGenre[]
  }
  isAvailable: boolean
  isSubscribed: boolean
}

export interface IBookResponse {
  data: IBook[]
  links: {}
  meta: {}
}

export interface IBooksParams {
  q?: string | null
  category?: number | null
  genres?: number[] | null
  publishers?: number[] | null
  page?: number
  id?: string | null
  status?: string | null
  order?: 'asc' | 'desc'
  sort?: string
}

export interface IBookForm {
  title: string
  description: string
  author_id: number | null
  category_id: number
  publisher_id: number
  image?: string | null
}

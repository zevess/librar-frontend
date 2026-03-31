import type { IBook } from '@/entities/book'

export interface IUserSubscriptions {
  data: {
    books: {
      data: IBook[]
    }
  }
}

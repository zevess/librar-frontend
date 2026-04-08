import { bookData, type IBook } from '@/entities/book/model/book.types'

export interface IAuthor {
  id: number
  name: string
  slug: string
  description?: string
  books: {
    data: IBook[]
  }
}

export interface IAuthorForm {
  name: string
  description?: string
}

export interface IAuthorParams {
  id?: string | ''
  q?: string | ''
  page: number
}

export const authorData = {
  name: 'Скотт Снайдер',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
  slug: 'scott-snyder',
  books: bookData,
}

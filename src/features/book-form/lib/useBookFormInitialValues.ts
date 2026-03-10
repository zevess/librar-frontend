import type { IBook } from '@/entities/book'

export const useBookFormInitialValues = (book: IBook | undefined) => {
  return {
    title: book ? book.title : '',
    description: book ? book.description : '',
    category_id: book ? book.category.id : undefined,
    publisher_id: book ? book.publisher.id : undefined,
    author_id: book ? book.author.id : undefined,
  }
}

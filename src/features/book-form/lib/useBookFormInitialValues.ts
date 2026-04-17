import type { IBook } from '@/entities/book'

export const useBookFormInitialValues = (book: IBook | undefined) => {
  return {
    title: book?.title ? book.title : '',
    description: book?.description ? book.description : '',
    category_id: book?.category ? book.category.id : undefined,
    publisher_id: book?.publisher ? book.publisher.id : undefined,
    author_id: book?.author ? book.author?.id : null,
  }
}

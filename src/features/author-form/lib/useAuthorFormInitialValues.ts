import type { IAuthor } from '@/entities/author'

export const useAuthorFormInitialValues = (author: IAuthor | undefined) => {
  return {
    name: author ? author.name : '',
    description: author ? author.description : '',
  }
}

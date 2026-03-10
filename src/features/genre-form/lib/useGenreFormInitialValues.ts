import type { ICategory } from '@/entities/category'
import type { IGenre } from '@/entities/genre'

export const useGenreFormInitialValues = (genre: IGenre | undefined) => {
  return {
    name: genre ? genre.name : '',
  }
}

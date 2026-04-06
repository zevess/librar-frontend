import { useAttachGenres, useDetachGenres } from '@/entities/genre'

export const useGenresAction = (bookId: string) => {
  const { attachGenre } = useAttachGenres(bookId)
  const { detachGenre } = useDetachGenres(bookId)

  const genresAction = (mode: 'attach' | 'detach', genres: number[]) => {
    if (mode === 'attach') {
      attachGenre({
        genres: genres,
      })
    }
    if (mode === 'detach') {
      detachGenre({
        genres: genres,
      })
    }
  }
  return { genresAction }
}

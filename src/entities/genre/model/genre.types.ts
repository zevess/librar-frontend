export interface IGenre {
  id: number
  name: string
  slug: string
  isDeleted?: boolean
}

export interface IGenreForm {
  name: string
}

export interface IGenresParasm {
  genres: number[] | null
}

export interface IGenresParams {
  q?: string | null
  id?: string | null
  page?: number
}

export const genreData = [
  {
    name: 'Фантастика',
    slug: 'fantastika',
  },
  {
    name: 'Приключения',
    slug: 'priklyucheniya',
  },
  {
    name: 'Ужасы',
    slug: 'yzhasi',
  },
  {
    name: 'Драма',
    slug: 'drama',
  },
]

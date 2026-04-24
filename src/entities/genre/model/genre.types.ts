export interface IGenre {
  id: number
  name: string
  slug: string
  isDeleted?: boolean
}

export interface IGenreForm {
  name: string
}

export interface IGenres {
  genres: number[] | null
}

export interface IGenresParams {
  q?: string | null
  id?: string | null
  page?: number
}

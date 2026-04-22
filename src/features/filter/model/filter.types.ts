export interface IFilter {
  page: number
  id?: string | null
  q?: string | null
  bookId?: string | null
  status?: string | null
  email?: string | null
  userId?: string | null
  category?: number | null
  genres?: number[]
  publishers?: number[]
  role?: string | null
}

export const filterInitialData: IFilter = {
  page: 1,
  id: '',
  q: '',

  bookId: '',
  status: '',
  email: '',
  userId: '',

  category: null,
  genres: [],
  publishers: [],

  role: '',
}

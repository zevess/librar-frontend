export interface ICategory {
  id: number
  name: string
  slug: string
  description?: string
}

export const categoryData = [
  {
    id: 1,
    name: 'Художественная литература',
    slug: 'hudlitra',
  },
  {
    id: 2,
    name: 'Детские',
    slug: 'detskie',
  },
  {
    id: 3,
    name: 'Комиксы',
    slug: 'komiksy',
  },
  {
    id: 4,
    name: 'Артбуки',
    slug: 'artbuki',
  },
]

import { PUBLIC_URL } from '@/shared/config/url.config'
import type { IHeaderNavItem } from './types'

export const useAdminHeaderNavigation = (): IHeaderNavItem[] => {
  return [
    {
      title: 'Брони',
      url: PUBLIC_URL.adminReservations(),
      icon: 'ticket',
    },
    {
      title: 'Книги',
      url: PUBLIC_URL.adminBooks(),
      icon: 'book',
    },
    {
      title: 'Авторы',
      url: PUBLIC_URL.adminAuthors(),
      icon: 'pencil',
    },
    {
      title: 'Издательства',
      url: PUBLIC_URL.adminPublishers(),
      icon: 'building-columns',
    },
    {
      title: 'Жанры',
      url: PUBLIC_URL.adminGenres(),
      icon: 'tags',
    },
    {
      title: 'Категории',
      url: PUBLIC_URL.adminCategories(),
      icon: 'table',
    },
    {
      title: 'Пользователи',
      url: PUBLIC_URL.adminUsers(),
      icon: 'users',
    },
  ]
}

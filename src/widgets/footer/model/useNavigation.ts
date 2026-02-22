import { PUBLIC_URL } from '@/shared/config/url.config'
import type { IFooterNavItem } from './types'

export const useFooterNavigation = (): IFooterNavItem[] => {
  return [
    {
      title: 'Профиль',
      url: PUBLIC_URL.profile(),
      icon: 'user',
    },
    {
      title: 'Каталог',
      url: PUBLIC_URL.catalog(),
      icon: 'book',
    },
  ]
}

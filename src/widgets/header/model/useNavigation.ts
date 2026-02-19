import { PUBLIC_URL } from '@/shared/config/url.config'
import type { INavItem } from './types'

export const useNavigation = (): INavItem[] => {
  return [
    {
      title: 'Профиль',
      url: PUBLIC_URL.profile(),
      icon: 'user',
    },
    {
      title: 'Уведомления',
      url: PUBLIC_URL.profile(),
      icon: 'inbox',
    },
  ]
}

import { PUBLIC_URL } from '@/shared/config/url.config'
import type { IHeaderNavItem } from './types'

export const useHeaderNavigation = (): IHeaderNavItem[] => {
  return [
    {
      title: 'Профиль',
      url: PUBLIC_URL.profile(),
      icon: 'user',
    },
  ]
}

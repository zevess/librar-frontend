import { PUBLIC_URL } from '@/shared/config/url.config'
import type { IHeaderNavItem } from './types'

export const useHeaderNavigation = (isAuthentificated: boolean): IHeaderNavItem[] => {
  return [
    {
      title: isAuthentificated ? 'Профиль' : 'Войти',
      url: isAuthentificated ? PUBLIC_URL.profile() : PUBLIC_URL.auth(),
      icon: 'user',
    },
  ]
}

import Cookies from 'js-cookie'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
  'TOKEN' = 'token',
}
export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.TOKEN)
  return accessToken || null
}

export const saveTokenToStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.TOKEN, accessToken, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
    expires: 1,
  })
}

export const removeTokenFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
  })
}

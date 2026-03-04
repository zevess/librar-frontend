import Cookies from 'js-cookie'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
}
export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export const saveAccessToken = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
    expires: 1,
  })
}

export const removeAccessToken = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
  })
}

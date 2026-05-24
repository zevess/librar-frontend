import Cookies from 'js-cookie'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'access_token',
  'REFRESH_TOKEN' = 'refresh_token',
}
export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)
  return refreshToken || null
}

export const saveAccessToken = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
    expires: 1,
  })
}
export const saveRefreshToken = (refreshToken: string) => {
  Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
    expires: 7,
  })
}

export const removeRefreshToken = () => {
  Cookies.remove(EnumTokens.REFRESH_TOKEN, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
  })
}

export const removeAccessToken = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN, {
    domain: import.meta.env.VITE_APP_DOMAIN,
    sameSite: 'strict',
  })
}

import type { IUser } from '@/entities/user'

export interface ILogin {
  email: string
  password: string
}

export interface IAuthResponse {
  user: IUser
  token: string
}
